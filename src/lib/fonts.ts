import {
  Noto_Sans_KR,
  Noto_Serif_KR,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Space_Mono,
} from 'next/font/google'

export const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const fontMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const fontKoreanSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
})

export const fontKoreanSerif = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-noto-serif-kr',
  display: 'swap',
})

export const siteFontVariables = [
  fontDisplay.variable,
  fontSans.variable,
  fontMono.variable,
  fontKoreanSans.variable,
  fontKoreanSerif.variable,
].join(' ')
