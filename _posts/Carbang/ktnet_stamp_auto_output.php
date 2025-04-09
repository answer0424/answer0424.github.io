<!-- php 코드 시작 태그 -->
<?php
// 환경 설정을 불러옴
require ("config.php");     

// DB 접속
require ("dbconn.php");

// 한글 깨짐 방지 (utf-8)
header("Content-Type: text/html; charset=utf-8");

// 오늘 날짜를 YYYYMMDD 형식으로 지정
$Carbang_Dday=date("Ymd");

// gti_calendar 테이블에서 오늘 날짜를 기준으로 검색
$sql_car_calendar_info="select * from gti_calendar where today='".$Carbang_Dday."'";

// 발행이 불가능한 날이면 스크립트 즉시 종료 (예: 공휴일, 주말)
$hun->query($sql_car_calendar_info);
$hun->next_record();
$daysection=trim(stripslashes($hun->f(daysection)));
$requst_days=trim(stripslashes($hun->f(prev_workday)));
if($daysection != "N") {
        exit;
}

// 전자 수입인지 발생 요청 저장소
// 조건 
// path = 0 ➡️ 아직 처리되지 않은 요청
// status = 'Y' ➡️ 유효한 요청
// waiting = '1' ➡️ 발행 대기 상태 
// 유효한 식별자 존재
$sql_car_request_info_request="
        SELECT *
        FROM tb_pot_rpa_issue_req
        WHERE path='0'
                AND status='Y'
                AND waiting='1'
                AND unique_id is not null
        ORDER BY req_no
";
$hun->query($sql_car_request_info_request);

// 총 건수 
$Total_set_request = $hun->nf();

// 요청 목록 순회하며 발행 처리
for ($rset=0; $rset < $Total_set_request; $rset++) {
        $hun->seek($rset);
        $hun->next_record();

        $req_no=trim(stripslashes($hun->f(req_no)));
        $contract_no=trim(stripslashes($hun->f(contract_no)));
        $unique_id=trim(stripslashes($hun->f(unique_id)));
        $payment_amount=trim(stripslashes($hun->f(payment_amount)));

        // payment_amount가 없을 경우 3000으로 처리 (특별한 경우가 아니면 3000원)
        if($payment_amount) {
                $payment_amount=$payment_amount;
        } else {
                $payment_amount="3000";
        }

        // 실제 사용 가능한 수입인지 테이블에 데이터 등록
        // gti_ets_infos = 전자 수입인지 발행 완료 테이블
        // 발행 시간 / 계약번호 / 금액 / 고유식별자
        $sql_car_request_info_request_in="
                INSERT INTO gti_ets_infos (
                        created_at
                        , no
                        , amount
                        , unique_id
                ) VALUES(
                        now()
                        , '".$contract_no."'
                        , '".$payment_amount."'
                        , '".$unique_id."'
                )
        ";
        $hun2->query($sql_car_request_info_request_in);

        // 원본 요청 테이블 상태 업데이트
        // 해당 요청을 발행 완료 상태로 마킹
        $sql_car_request_info_request_up="
                UPDATE tb_pot_rpa_issue_req SET
                        path = '1'
                        , waiting = '0'
                WHERE req_no = '".$req_no."'
                        AND contract_no = '".$contract_no."'
                        AND unique_id='".$unique_id."'
        ";
        $hun2->query($sql_car_request_info_request_up);
}
