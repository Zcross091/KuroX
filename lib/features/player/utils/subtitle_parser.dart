import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:flutter/rendering.dart';
import 'package:http/http.dart' as http;
import 'package:shonenx/core/network/http_client.dart';
import 'package:shonenx/core/utils/app_logger.dart';
import 'package:shonenx/features/player/utils/parsers/ass_parser.dart';
import 'package:shonenx/features/player/utils/parsers/srt_parser.dart';
import 'package:shonenx/features/player/utils/parsers/subtitle_parser_base.dart';

class SubtitleCue {
  final Duration start;
  final Duration end;
  final String text;
  final Alignment alignment;

  const SubtitleCue({
    required this.start,
    required this.end,
    required this.text,
    this.alignment = Alignment.bottomCenter,
  });
}

class SubtitleParser {
  static final _log = AppLogger.scope(SubtitleParser);

  static Future<List<SubtitleCue>> parseFromUrl(
    String url, {
    HTTP? httpClient,
    Map<String, String>? headers,
  }) async {
    try {
      // Check if this is a local file path or file:// URI
      final isNetwork = url.startsWith('http://') || url.startsWith('https://');
      if (!isNetwork) {
        String filePath = url;
        if (url.startsWith('file://')) {
          filePath = Uri.parse(url).toFilePath();
        }
        final file = File(filePath);
        if (await file.exists()) {
          final content = await file.readAsString();
          return parseString(content);
        }
        return [];
      }

      if (httpClient != null) {
        _log.i('Fetching subtitle with app HTTP client from: $url');
        final response = await httpClient.get(url, headers: headers);
        if (response.statusCode == 200) {
          return parseString(response.body);
        } else {
          _log.w('Failed to fetch subtitle. Status: ${response.statusCode}');
        }
      } else {
        final response = await http.get(Uri.parse(url), headers: headers);
        if (response.statusCode == 200) {
          final content = utf8.decode(response.bodyBytes, allowMalformed: true);
          return parseString(content);
        }
      }
    } catch (e, st) {
      _log.e('Error fetching subtitle', e, st);
    }
    return [];
  }

  static List<SubtitleCue> parseString(String content) {
    if (content.trim().isEmpty) return [];

    BaseSubtitleParser parser;

    // Detect format
    if (content.contains('[Script Info]') || content.contains('[V4+ Styles]')) {
      parser = const AssParser();
    } else {
      // Fallback to SRT/VTT parser for standard block formats
      parser = const SrtParser();
    }

    return parser.parse(content);
  }

  static String cleanSubtitleText(String text) {
    // 1. Remove ASS style override tags like {\an2}, {\pos(x,y)}, {\b1}, {\c&H...&}
    var cleaned = text.replaceAll(RegExp(r'\{[^}]*\}'), '');

    // 2. Remove WebVTT formatting tags e.g. <b>, </i>, <c.color>, <v Voice>
    cleaned = cleaned.replaceAll(RegExp(r'<\/?[a-zA-Z0-9_.\-]+(?:\s+[^>]*)?>'), '');

    // 3. Remove timestamp-like strings that might have bled in
    cleaned = cleaned.replaceAll(
      RegExp(r'\d{2}:\d{2}:\d{2}[.,]\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}[.,]\d{3}'),
      '',
    );

    // 4. Decode common HTML entities
    cleaned = cleaned
        .replaceAll('&amp;', '&')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&quot;', '"')
        .replaceAll('&#39;', "'")
        .replaceAll('&nbsp;', ' ');

    // 5. Replace ASS hard breaks \N, \n, and \h (non-breaking space)
    cleaned = cleaned
        .replaceAll(r'\N', '\n')
        .replaceAll(r'\n', '\n')
        .replaceAll(r'\h', ' ');

    // 6. Clean multiple empty lines and trim
    cleaned = cleaned
        .split('\n')
        .map((l) => l.trim())
        .where((l) => l.isNotEmpty)
        .join('\n');

    return cleaned.trim();
  }
}
