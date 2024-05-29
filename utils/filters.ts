class FilterUtils {
  static slugifyNeed(need: string) {
    return need.normalize('NFD')
      .replace(/[\u0300-\u036F]/g, '')
      .replace(/[^a-z ]/gi, '')
      .toLowerCase()
      .trim();
  }
}

export default FilterUtils;
