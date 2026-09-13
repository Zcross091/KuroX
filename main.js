/**
 * KuroX Official Web Client Script
 * Direct Browser Downloads, GitHub API Star Tracker, OS Detection, and SEO interactions
 */

const GITHUB_REPO = 'Zcross091/KuroX';
const FALLBACK_VERSION = 'v2.1.12';

// Direct GitHub release asset mappings
const RELEASE_ASSETS = {
  'android-universal': {
    name: 'KuroX-v2.1.12-android-universal.apk',
    os: 'Android (Universal & TV)',
    size: '85.4 MB',
    desc: 'Compatible with all Android phones, tablets, TV sticks, and Android TV.'
  },
  'android-arm64': {
    name: 'KuroX-v2.1.12-android-arm64-v8a.apk',
    os: 'Android (64-bit Phones)',
    size: '33.7 MB',
    desc: 'Optimized high-speed build for modern Android smartphones.'
  },
  'android-armv7': {
    name: 'KuroX-v2.1.12-android-armeabi-v7a.apk',
    os: 'Android (32-bit Legacy)',
    size: '32.8 MB',
    desc: 'For older 32-bit smartphones and legacy tablets.'
  },
  'android-x86': {
    name: 'KuroX-v2.1.12-android-x86_64.apk',
    os: 'Android (x86_64)',
    size: '35.3 MB',
    desc: 'For Chromebooks, Android x86 PCs, and desktop emulators.'
  },
  'windows-setup': {
    name: 'KuroX-v2.1.12-windows-setup.exe',
    os: 'Windows (Setup Installer)',
    size: '35.9 MB',
    desc: 'Recommended. Full installer with start menu, desktop shortcut & Discord RPC.'
  },
  'windows-portable': {
    name: 'KuroX-v2.1.12-windows-portable.zip',
    os: 'Windows (Portable ZIP)',
    size: '46.0 MB',
    desc: 'Standalone executable. Extract and run without installation.'
  },
  'linux-tar': {
    name: 'KuroX-v2.1.12-linux-x86_64.tar.gz',
    os: 'Linux (tar.gz)',
    size: '93.4 MB',
    desc: 'Universal Linux standalone package for Arch, Ubuntu, Fedora, Debian.'
  },
  'linux-zip': {
    name: 'KuroX-v2.1.12-linux-x86_64.zip',
    os: 'Linux (zip)',
    size: '93.4 MB',
    desc: 'Standard compressed standalone zip bundle for Linux desktops.'
  },
  'macos-zip': {
    name: 'KuroX-v2.1.12-macos-universal.zip',
    os: 'macOS (Universal)',
    size: '67.0 MB',
    desc: 'Universal macOS package for Apple Silicon and Intel Macs.'
  },
  'ios-ipa': {
    name: 'KuroX-v2.1.12-ios-unsigned.ipa',
    os: 'iOS (Sideload IPA)',
    size: '36.0 MB',
    desc: 'Lightweight IPA for iPhone and iPad via AltStore, Sideloadly, or TrollStore.'
  }
};

let currentTag = FALLBACK_VERSION;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  fetchGitHubMetadata();
  initOsDetection();
  initFaqAccordion();
  initAmbientCanvas();
});

/**
 * Fetch GitHub Repository Stars and latest release tag
 */
async function fetchGitHubMetadata() {
  try {
    // 1. Fetch Stars
    const repoRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`);
    if (repoRes.ok) {
      const repoData = await repoRes.json();
      const stars = repoData.stargazers_count;
      document.querySelectorAll('.github-star-count').forEach(el => {
        el.textContent = stars !== undefined ? stars : '★ Star';
      });
    }
  } catch (e) {
    console.warn('GitHub star fetch fallback:', e);
  }

  try {
    // 2. Fetch Latest Release Tag
    const relRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
    if (relRes.ok) {
      const relData = await relRes.json();
      if (relData.tag_name) {
        currentTag = relData.tag_name;
        document.querySelectorAll('.current-version-tag').forEach(el => {
          el.textContent = currentTag;
        });
      }
    }
  } catch (e) {
    console.warn('GitHub release tag fetch fallback:', e);
  }

  try {
    // 3. Fetch Total Downloads across all releases
    const releasesRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=20`);
    if (releasesRes.ok) {
      const releasesData = await releasesRes.json();
      if (Array.isArray(releasesData)) {
        let totalDownloads = 0;
        releasesData.forEach(rel => {
          (rel.assets || []).forEach(a => {
            totalDownloads += (a.download_count || 0);
          });
        });
        if (totalDownloads > 0) {
          document.querySelectorAll('.total-downloads-count').forEach(el => {
            el.textContent = totalDownloads >= 100 ? `${totalDownloads}+` : `${totalDownloads}`;
          });
        }
      }
    }
  } catch (e) {
    console.warn('GitHub downloads count fetch fallback:', e);
  }
}

/**
 * Detect User OS and highlight recommended options
 */
function initOsDetection() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  let detectedOs = 'android'; // default
  let osName = 'Android';

  const isIOS = /iphone|ipad|ipod/.test(userAgent) || 
    (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);

  if (isIOS) {
    detectedOs = 'ios';
    osName = 'iOS / iPadOS';
  } else if (/macintosh|mac os x/.test(userAgent)) {
    detectedOs = 'macos';
    osName = 'macOS';
  } else if (userAgent.indexOf('win') !== -1) {
    detectedOs = 'windows';
    osName = 'Windows';
  } else if (userAgent.indexOf('linux') !== -1 && userAgent.indexOf('android') === -1) {
    detectedOs = 'linux';
    osName = 'Linux';
  } else if (userAgent.indexOf('android') !== -1) {
    detectedOs = 'android';
    osName = 'Android';
  }

  // Update OS detection banner if present
  const banner = document.getElementById('detected-os-badge');
  if (banner) {
    banner.innerHTML = `<span class="badge-pulse"></span> Detected OS: <strong>${osName}</strong>. Recommended download is highlighted below!`;
  }

  // Switch tab on download page if tab switcher is present
  switchTab(detectedOs);
}

/**
 * Switch tabs on Download page
 */
function switchTab(osKey) {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.download-platform-panel');

  if (!tabBtns.length || !panels.length) return;

  tabBtns.forEach(btn => {
    if (btn.dataset.os === osKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  panels.forEach(panel => {
    if (panel.id === `panel-${osKey}`) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });
}

/**
 * Direct Browser Download Trigger:
 * Downloads the binary file directly right in the browser WITHOUT opening the GitHub release page!
 */
function triggerDirectDownload(assetKey) {
  const asset = RELEASE_ASSETS[assetKey];
  if (!asset) return;

  // Substitute current release tag dynamically if tag was updated from GitHub API
  const fileName = asset.name.replace(/v\d+\.\d+\.\d+(-[a-zA-Z0-9]+)?/g, currentTag);

  // Compute direct release URL
  // Format: https://github.com/{owner}/{repo}/releases/download/{tag}/{filename}
  const directUrl = `https://github.com/${GITHUB_REPO}/releases/download/${currentTag}/${fileName}`;

  // 1. Show Toast Feedback
  showDownloadToast(fileName, asset.size, asset.os);

  // 2. Trigger instant silent download
  const link = document.createElement('a');
  link.href = directUrl;
  link.setAttribute('download', fileName);
  link.setAttribute('rel', 'noopener noreferrer');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
  }, 1000);

  // 3. Record privacy-friendly download event in GoatCounter
  try {
    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      window.goatcounter.count({
        path: 'download-' + assetKey,
        title: 'Download ' + (asset.os || assetKey),
        event: true
      });
    }
  } catch (e) {
    // Non-blocking telemetry
  }
}

/**
 * Display toast confirmation when download is initiated
 */
function showDownloadToast(fileName, fileSize, osType) {
  let toast = document.getElementById('download-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'download-toast';
    toast.className = 'download-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="toast-header">
      <div class="toast-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download Started!
      </div>
      <button class="toast-close" onclick="closeDownloadToast()">✕</button>
    </div>
    <div class="toast-desc">
      Downloading <strong>${fileName}</strong> (${fileSize}) for ${osType}.<br>
      <span style="color: #64748b; font-size: 0.8rem;">Your browser is downloading this file directly from the secure KuroX release pipeline.</span>
    </div>
  `;

  toast.classList.add('show');
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    closeDownloadToast();
  }, 7000);
}

function closeDownloadToast() {
  const toast = document.getElementById('download-toast');
  if (toast) toast.classList.remove('show');
}

/**
 * FAQ Accordion handler
 */
function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Ambient floating canvas particles for cyber-aesthetic
 */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 35;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 1,
      color: Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(6, 182, 212, 0.35)'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }

  animate();
}
