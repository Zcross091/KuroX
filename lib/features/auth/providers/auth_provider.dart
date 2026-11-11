import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:shonenx/core/network/secure_storage.dart';
import 'package:shonenx/features/tracking/domain/models/tracker_type.dart';
import 'package:shonenx/features/tracking/engine/remote_tracker.dart';
import 'package:shonenx/features/tracking/engine/tracking_service.dart';
import 'package:shonenx/features/tracking/providers/tracker_profile_provider.dart';

final authTokensProvider =
    AsyncNotifierProvider<AuthTokensNotifier, Map<TrackerType, String>>(
      AuthTokensNotifier.new,
    );

class AuthTokensNotifier extends AsyncNotifier<Map<TrackerType, String>> {
  static const _prefix = 'auth_token_';
  FlutterSecureStorage get _storage => ref.read(secureStorageProvider);

  @override
  Future<Map<TrackerType, String>> build() async {
    final allKeys = await _storage.readAll();
    final tokens = <TrackerType, String>{};

    for (final entry in allKeys.entries) {
      final key = entry.key;

      if (!key.startsWith(_prefix)) continue;

      final providerId = key.substring(_prefix.length);

      try {
        final type = TrackerType.tryFromId(providerId);
        if (type != null) {
          tokens[type] = entry.value;
        }
      } catch (_) {}
    }

    return tokens;
  }

  Map<TrackerType, String> _current() => state.value ?? const {};

  String _sanitizeToken(String rawToken) {
    String cleanToken = rawToken.trim();
    if (cleanToken.isEmpty) return '';

    // Strip Bearer prefix if present
    cleanToken = cleanToken
        .replaceFirst(RegExp(r'^Bearer\s+', caseSensitive: false), '')
        .trim();

    // Extract access_token or token parameter if a URL, query, or fragment was provided
    final tokenMatch =
        RegExp(r'(?:access_token|token)=([^&/#\s]+)').firstMatch(cleanToken);
    if (tokenMatch != null && tokenMatch.group(1) != null) {
      cleanToken = tokenMatch.group(1)!;
    }

    return cleanToken;
  }

  Future<void> login(RemoteTracker tracker) async {
    final rawToken = await tracker.authenticator.performLogin();
    final token = _sanitizeToken(rawToken);
    if (token.isEmpty) {
      throw Exception('Failed to get token from ${tracker.type.displayName}');
    }

    await _storage.write(key: '$_prefix${tracker.type.id}', value: token);
    state = AsyncData({..._current(), tracker.type: token});

    final profile = await tracker.fetchProfile();

    ref
        .read(trackerProfileProvider.notifier)
        .saveProfile(tracker.type, profile);

    tracker.toggleTracker(ref, true);
  }

  Future<void> setToken(RemoteTracker tracker, String token) async {
    final cleanToken = _sanitizeToken(token);
    if (cleanToken.isEmpty) {
      throw Exception('Token cannot be empty');
    }

    await _storage.write(key: '$_prefix${tracker.type.id}', value: cleanToken);
    state = AsyncData({..._current(), tracker.type: cleanToken});

    try {
      final profile = await tracker.fetchProfile();
      ref
          .read(trackerProfileProvider.notifier)
          .saveProfile(tracker.type, profile);
      tracker.toggleTracker(ref, true);
    } catch (e) {
      await _storage.delete(key: '$_prefix${tracker.type.id}');
      final reverted = Map<TrackerType, String>.from(_current())
        ..remove(tracker.type);
      state = AsyncData(reverted);
      rethrow;
    }
  }

  Future<void> logout(RemoteTracker tracker) async {
    await _storage.delete(key: '$_prefix${tracker.type.id}');

    ref.read(trackerProfileProvider.notifier).removeProfile(tracker.type);

    tracker.toggleTracker(ref, false);

    final updated = Map<TrackerType, String>.from(_current())
      ..remove(tracker.type);

    state = AsyncData(updated);
  }
}
