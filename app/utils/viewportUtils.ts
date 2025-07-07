export const viewportUtils = {
  /**
   * 태블릿 크기 이하 뷰포트 확인 (768px 기준)
   * @returns {boolean} 좁은 뷰포트 여부
   */
  isNarrowViewport: () => {
    return window.matchMedia("(max-width: 768px)").matches;
  },

  /**
   * 넓은 뷰포트 확인 (768px 초과)
   * @returns {boolean} 넓은 뷰포트 여부
   */
  isWideViewport: () => {
    return !viewportUtils.isNarrowViewport();
  },

  /**
   * 미디어 쿼리 객체 생성
   * @param {string} query - 미디어 쿼리 문자열
   * @returns {MediaQueryList} 미디어 쿼리 객체
   */
  createMediaQuery: (query:any) => {
    return window.matchMedia(query);
  },

  /**
   * 현재 뷰포트 크기 반환
   * @returns {Object} 뷰포트 크기 정보
   */
  getViewportSize: () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  },

  /**
   * 화면 크기 반환
   * @returns {Object} 화면 크기 정보
   */
  getScreenSize: () => {
    return {
      width: screen.width,
      height: screen.height,
      maxSize: Math.max(screen.width, screen.height)
    };
  }
};