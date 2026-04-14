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
    </style>
</head>
<body class="min-h-screen bg-amber-50 flex items-center justify-center p-6">
    <div class="text-center max-w-md w-full">

        {{-- Hex bee icon --}}
        <div class="flex justify-center mb-8">
            <div class="hex bg-yellow-400 w-24 h-24 flex items-center justify-center shadow-lg shadow-yellow-400/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-amber-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2a7 7 0 0 1 7 7c0 4-3.5 8-7 11C8.5 17 5 13 5 9a7 7 0 0 1 7-7z"/>
                    <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none"/>
                    <path d="M8.5 14.5 Q12 12 15.5 14.5" stroke-width="1.5"/>
                </svg>
            </div>
        </div>

        {{-- Error code --}}
        <div class="text-8xl font-black text-yellow-400 leading-none mb-2 tracking-tighter" style="text-shadow: 3px 3px 0px #92400e;">
            @yield('code')
        </div>

        {{-- Title --}}
        <h1 class="text-2xl font-bold text-amber-900 mb-3">
            @yield('heading')
        </h1>

        {{-- Message --}}
        <p class="text-amber-700 mb-8 leading-relaxed">
            @yield('message')
        </p>

        {{-- Actions --}}
        <div class="flex gap-3 justify-center">
            <a href="/"
               class="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-amber-900 font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Go Home
            </a>
            <button onclick="history.back()"
                    class="inline-flex items-center gap-2 bg-white hover:bg-amber-50 text-amber-800 font-semibold px-6 py-3 rounded-xl border border-amber-200 transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
                </svg>
                Go Back
            </button>
        </div>

        {{-- Branding --}}
        <p class="mt-12 text-amber-400 text-sm font-medium tracking-wide">BuzzyHive &mdash; Stingless Bee Monitoring</p>
    </div>
</body>
</html>
