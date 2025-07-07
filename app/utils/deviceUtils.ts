/**
 * 디바이스 감지 관련 유틸리티 함수들
 */
export const deviceUtils = {
  /**
   * 최신 iPad 감지 (macOS Safari UA를 사용하는 경우)
   * @returns {boolean} iPad 여부
   */
  isModernIPad: () => {
    const ua = navigator.userAgent;
    
    // Safari + Mac 조합 확인
    if (!/Safari/i.test(ua) || !/Macintosh/i.test(ua)) {
      return false;
    }
    
    // 터치 지원 여부 확인
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!hasTouch) {
      return false;
    }
    
    // iPad 해상도 범위 확인
    const screenSize = Math.max(screen.width, screen.height);
    return screenSize >= 1024 && screenSize <= 1366;
  },

  /**
   * 전통적인 모바일/태블릿 OS 감지
   * @returns {boolean} 모바일/태블릿 여부
   */
  isMobileOrTabletOS: () => {
    const ua = navigator.userAgent;
    return /Mobi|Android|iPhone|iPad|Tablet|iPod|Android(?!.*Mobile)/i.test(ua);
  },

  /**
   * 모바일 또는 태블릿 디바이스 감지 (최신 iPad 포함)
   * @returns {boolean} 모바일/태블릿 여부
   */
  isMobileOrTablet: () => {
    return deviceUtils.isMobileOrTabletOS() || deviceUtils.isModernIPad();
  },

  /**
   * PC OS 여부 확인
   * @returns {boolean} PC OS 여부
   */
  isPCOS: () => {
    return !deviceUtils.isMobileOrTablet();
  },

  /**
   * 사용자 에이전트 정보 반환
   * @returns {string} User Agent 문자열
   */
  getUserAgent: () => {
    return navigator.userAgent;
  },

  /**
   * 터치 지원 여부 확인
   * @returns {boolean} 터치 지원 여부
   */
  hasTouchSupport: () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }
};