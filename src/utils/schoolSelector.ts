/**
 * Determines the school of thought based on the language
 * Indonesian (id) defaults to Shafi, all others default to Hanafi
 */
export function getSchoolByLanguage(language: string): 'hanafi' | 'shafi' {
  return language === 'id' ? 'shafi' : 'hanafi';
}