import React, { useEffect } from 'react'

function useOnclickOutside(ref, handler) {
  useEffect(() => {
    console.log('ref',ref);

    const listener = (event) => {
      if(!ref.current || ref.current.contains(event.target)){
        // 모달창이 안 닫히는 경우
        console.log("event.target->",event.target);
        return; // 함수종료
      }
      // 모달창이 닫히는 경우 () => {setModalOpen{false}}
      handler(event);

    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

  },[ref, handler])

}

export default useOnclickOutside