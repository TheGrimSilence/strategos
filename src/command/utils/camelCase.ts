export default function camelCase(flag: string): string {
  return flag.split('-').reduce((str: string, word: string) => {
    return str + word[0].toUpperCase() + word.slice(1);
  });
}
