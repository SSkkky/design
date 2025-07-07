import { deviceUtils } from '@/app/utils/deviceUtils.js';
import { viewportUtils } from '@/app/utils/viewportUtils.js';

/**
 * 커서 이펙트 관리 훅
 * PC OS이고 넓은 뷰포트일 때만 커서 이펙트를 활성화
 */
export const useCursorEffect = (setShouldRender:any) => {
  const shouldRenderCursor = () => {
    return deviceUtils.isPCOS() && viewportUtils.isWideViewport();
  };

  /**
   * 렌더링 상태 업데이트
   */
  const updateRenderState = () => {
    setShouldRender(shouldRenderCursor());
  };

  /**
   * 뷰포트 변경 이벤트 핸들러
   * PC OS일 때만 업데이트 (성능 최적화)
   */
  const handleViewportChange = () => {
    if (deviceUtils.isPCOS()) {
      updateRenderState();
    }
  };

  /**
   * 이벤트 리스너 설정 및 초기화
   */
  const initialize = () => {
    // 초기 렌더링 상태 설정
    updateRenderState();

    // 뷰포트 변경 감지 설정
    const mediaQuery = viewportUtils.createMediaQuery("(max-width: 768px)");
    mediaQuery.addEventListener("change", handleViewportChange);

    // 정리 함수 반환
    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  };

  return {
    initialize,
    shouldRenderCursor,
    updateRenderState
  };
};