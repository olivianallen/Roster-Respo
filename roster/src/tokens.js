export const C = {
  canvas:  '#F6F2EA',
  paper:   '#FBF8F2',
  ink:     '#2A1F16',
  ink2:    '#655A4E',
  ink3:    '#948A7F',
  sand:    '#E9E0D0',
  sand2:   '#DDD2BE',
  clay:    '#B4643E',
  clayDk:  '#904E2E',
  moss:    '#5E7A58',
  terra:   '#8F4A2E',
  line:    '#D8D0C0',
  interviewBg: '#F5EDEA',
};

const _F = {
  serif:  'Newsreader_400Regular',
  serifI: 'Newsreader_400Regular_Italic',
  serifM: 'Newsreader_500Medium',
  sans:   'Inter_400Regular',
  sansM:  'Inter_500Medium',
  sansS:  'Inter_600SemiBold',
  mono:   'JetBrainsMono_400Regular',
  monoM:  'JetBrainsMono_500Medium',
};

const _FSys = {
  serif:  'Georgia',
  serifI: 'Georgia',
  serifM: 'Georgia',
  sans:   'System',
  sansM:  'System',
  sansS:  'System',
  mono:   'Courier New',
  monoM:  'Courier New',
};

export let F = { ..._F };

export function setFontFallback(useFallback) {
  Object.assign(F, useFallback ? _FSys : _F);
}

export const SP = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 28 };
