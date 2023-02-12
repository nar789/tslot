let SlotMachine = {
    

    /**
     * @param {number} repeat
     * @returns {boolean}
     * @description 슬롯머신 릴 회전 수를 설정한다. 디폴트는 50.
     */
    setRepeat : setRepeat,
    

    /**
     * @returns {boolean}
     * @description 슬롯머신 릴을 회전시킨다. 게임 시작.
     */
    start : start, 


    /**
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @returns {boolean}
     * @description 슬롯머신 각 릴의 결과를 이용해 score를 계산한다.
     */
    calcResult : calcResult,


    /**
     * @param {number} score
     * @returns {boolean}
     * @description total score를 계산해 화면에 표시된 최종 스코어를 업데이트.
     */
    updateScore : updateScore,


    /**
     * @returns {boolean}
     * @description 슬롯머신 주변의 불빛을 반짝인다.
     */
    blink : blink,


     /**
     * @returns {string}
     * @description 현재 게임상태를 "ready" 또는 "start"로 반환한다.
     */
    getGameState : getGameState

}