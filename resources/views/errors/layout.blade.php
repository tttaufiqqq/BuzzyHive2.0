<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title') — BuzzyHive</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <style>
        @import url('https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,900');
        body { font-family: 'Instrument Sans', sans-serif; }

        .hex {
            clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
        }

        @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.8); }
            to   { opacity: 1; transform: scale(1.0); }
        }
        @keyframes idlePulse {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.85; }
        }
        .hex-icon {
            animation:
                fadeInScale 400ms ease-out forwards,
                idlePulse 3s ease-in-out 400ms infinite;
        }

        .btn-primary {
            display: inline-flex; align-items: center; gap: 8px;
            background-color: #F5C400; color: #1a1200;
            font-weight: 600; padding: 12px 24px;
            border-radius: 12px; border: none; cursor: pointer;
            box-shadow: 0 4px 16px rgba(245,196,0,0.30);
            transition: background-color 150ms ease, box-shadow 150ms ease;
            text-decoration: none; font-size: 15px;
        }
        .btn-primary:hover {
            background-color: #e6b800;
            box-shadow: 0 6px 20px rgba(245,196,0,0.40);
        }

        .btn-secondary {
            display: inline-flex; align-items: center; gap: 8px;
            background: transparent; color: #FBBF24;
            font-weight: 600; padding: 12px 24px;
            border-radius: 12px; border: 1.5px solid #FBBF24; cursor: pointer;
            transition: background-color 150ms ease;
            text-decoration: none; font-size: 15px;
        }
        .btn-secondary:hover { background-color: rgba(251,191,36,0.10); }

        .chip {
            font-size: 12px; padding: 6px 14px; border-radius: 9999px;
            border: 1px solid rgba(251,191,36,0.3); color: rgba(251,191,36,0.7);
            text-decoration: none;
            transition: border-color 150ms ease, color 150ms ease;
        }
        .chip:hover { border-color: rgba(251,191,36,0.8); color: #FBBF24; }

        .brand-link {
            display: inline-flex; align-items: center; gap: 8px;
            color: rgba(255,255,255,0.4); text-decoration: none;
            transition: color 200ms ease;
        }
        .brand-link:hover { color: rgba(255,255,255,0.7); }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-6" style="background-color: #1a1400;">
    <div class="text-center max-w-md w-full">

        {{-- Hex bee icon --}}
        <div class="flex justify-center" style="margin-bottom: 24px;">
            <div class="hex-icon hex w-24 h-24 flex items-center justify-center"
                 style="background-color: #FBBF24; box-shadow: 0 8px 24px rgba(251,191,36,0.20);">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24"
                     fill="none" stroke="#1a1200" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2a7 7 0 0 1 7 7c0 4-3.5 8-7 11C8.5 17 5 13 5 9a7 7 0 0 1 7-7z"/>
                    <circle cx="12" cy="9" r="2.5" fill="#1a1200" stroke="none"/>
                    <path d="M8.5 14.5 Q12 12 15.5 14.5" stroke-width="1.5"/>
                </svg>
            </div>
        </div>

        {{-- Error code --}}
        <div style="font-size: 96px; font-weight: 300; line-height: 1; letter-spacing: -0.04em; color: #FBBF24; margin-bottom: 8px;">
            @yield('code')
        </div>

        {{-- Heading --}}
        <h1 class="text-2xl font-semibold text-white" style="margin-bottom: 16px;">
            @yield('heading')
        </h1>

        {{-- Message --}}
        <p class="leading-relaxed" style="color: rgba(255,255,255,0.7); margin-bottom: 32px;">
            @yield('message')
        </p>

        {{-- CTA buttons --}}
        <div class="flex gap-3 justify-center" style="margin-bottom: 40px;">
            <a href="/" class="btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Go Home
            </a>
            <button onclick="history.back()" class="btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
                </svg>
                Go Back
            </button>
        </div>

        {{-- Escape hatch --}}
        <div>
            <div style="border-top: 1px solid rgba(255,255,255,0.08); margin-bottom: 16px;"></div>
            <p class="text-xs" style="color: rgba(255,255,255,0.4); margin-bottom: 12px;">
                Looking for something specific?
            </p>
            <div class="flex gap-2 justify-center flex-wrap">
                <a href="/dashboard" class="chip">Dashboard</a>
                <a href="/dashboard" class="chip">My Hives</a>
                <a href="mailto:support@buzzyhive.com" class="chip">Support</a>
            </div>
        </div>

        {{-- Footer brand lockup --}}
        <div style="margin-top: 48px;">
            <a href="/" class="brand-link">
                <div class="hex w-5 h-5 flex items-center justify-center flex-shrink-0"
                     style="background-color: #FBBF24;">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5" viewBox="0 0 24 24"
                         fill="none" stroke="#1a1200" stroke-width="2.5"
                         stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 2a7 7 0 0 1 7 7c0 4-3.5 8-7 11C8.5 17 5 13 5 9a7 7 0 0 1 7-7z"/>
                        <circle cx="12" cy="9" r="2.5" fill="#1a1200" stroke="none"/>
                    </svg>
                </div>
                <span class="text-sm font-medium tracking-wide">BuzzyHive &mdash; Stingless Bee Monitoring</span>
            </a>
        </div>

    </div>
</body>
</html>
