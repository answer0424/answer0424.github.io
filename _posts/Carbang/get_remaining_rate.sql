<select id="selectRemainingPrice" parameterType="map" resultType="map">
    	<!-- 차량시세 요건정의 변경 21.06.15 영업지원부 
    		2023.11.2 기준가격 가산 제외, 비영업용고정 변수 처리 수정
    		2023.11.15 20년이상 20년으로 처리 수정 -->
		<![CDATA[
	    	/* selectRemainingPrice 차량시세조회 */
	    	SELECT B.ElapsedYear AS ElapsedYear 									/*연차*/
					, #{Price}  AS 'stndardPrice'									/*기준가격*/
					, B.VehicleType AS 'VehicleType' 								/*차종*/
					, B.CountryOrigin AS 'CountryOrigin' 							/*제조국*/
					, B.RemainingPriceRate AS 'RemainingPriceRate' 					/*감가율*/
					, C.ExtraRate AS 'ExtraRate' 									/*추가감가율*/
					, TRUNCATE(B.RemainingPriceRate + C.ExtraRate, 3) AS 'depreciationRate' 				/*시세계산용감가율*/
					, ROUND(TRUNCATE(#{Price} * ((B.RemainingPriceRate + C.ExtraRate + Z.AdHocRate) - ((((B.RemainingPriceRate + C.ExtraRate + Z.AdHocRate) - 
						(AA.RemainingPriceRate2 + AA.ExtraRate2 + Z.AdHocRate)) / 12) * X.VehicleElapsedMonth)), 0) / 10000) * 10000 AS 'marketLowPrice' 		/*시세계산용하한가*/
					, #{Price} * B.RemainingPriceRate AS 'bondStndardPrice' 		/*채권계산용감가상각적용금액*/
					, X.VehicleElapsedYear_Original AS VehicleElapsedYear_Original	/*경과년*/
					, X.VehicleElapsedMonth AS VehicleElapsedMonth					/*경과월*/
					, X.VehicleElapsedDay AS VehicleElapsedDay						/*경과일*/
					, Z.UpRate AS UpRate									        /*상한가적용율*/
					, Z.MdlRate AS MdlRate                                          /*하한가적용율*/
					, AA.RemainingPriceRate2
					, AA.ExtraRate2
			FROM  TO_RAWDATA_VEHICLE_REMAININGRATE B
				INNER JOIN TO_RAWDATA_VEHICLE_REMAININGRATE_EXTRA C
					ON B.ElapsedYear = C.ElapsedYear
					AND B.VehicleType = C.VehicleType
					AND B.CountryOrigin = C.CountryOrigin
			
			CROSS JOIN 
			(SELECT TIMESTAMPDIFF(YEAR, #{ProductDate}, NOW()) AS VehicleElapsedYear_Original
					, TIMESTAMPDIFF(MONTH, #{ProductDate}, NOW())%12 AS VehicleElapsedMonth
					, DATEDIFF(NOW(), DATE_ADD(#{ProductDate}, INTERVAL TIMESTAMPDIFF(MONTH, #{ProductDate}, NOW()) MONTH)) AS VehicleElapsedDay
			) X
			/*
			(SELECT TRUNCATE(TO_GetElapsedMonth(ProductDate)/12,0) AS VehicleElapsedYear_Original
					,TRUNCATE(TO_GetElapsedMonth(ProductDate)/12,0)+1 AS ElapsedYear_Calc
					, TO_GetElapsedMonth(ProductDate)%12 AS VehicleElapsedMonth
					, DAY(FROM_UNIXTIME(UNIX_TIMESTAMP(DATE(NOW()))-UNIX_TIMESTAMP(DATE(ProductDate)),'%Y%m%d')) AS VehicleElapsedDay
			) X
			*/
			CROSS JOIN
			(SELECT UpRate as UpRate, MdlRate as MdlRate, IFNULL(AdHocRate, 0.0) as AdHocRate 
				FROM TO_RAWDATA_VEHICLE_REMAININGRATE_ADDRATIO 
				WHERE 1=1
					AND SALS_YN = #{salsYn} 
			) Z
			
			CROSS JOIN
			(
				SELECT AAB.RemainingPriceRate as RemainingPriceRate2
					,AAC.ExtraRate as ExtraRate2 
				FROM TO_RAWDATA_VEHICLE_REMAININGRATE AAB INNER JOIN TO_RAWDATA_VEHICLE_REMAININGRATE_EXTRA AAC
					ON AAB.ElapsedYear = AAC.ElapsedYear
						AND AAB.VehicleType = AAC.VehicleType
						AND AAB.CountryOrigin = AAC.CountryOrigin 
				WHERE 1=1
					AND AAB.Purpose = #{Purpose}
					AND AAB.ElapsedYear = IF(TIMESTAMPDIFF(YEAR, #{ProductDate}, NOW()) +1 > 20, 20, TIMESTAMPDIFF(YEAR, #{ProductDate}, NOW()) +1) 	/* 2022.03.15 => 2022.03.28 Badboy => 2023.11.15 */
					AND AAB.VehicleType = #{CarType}						/*차종*/
					AND AAB.CountryOrigin = #{CountryOrigin}				/*생산구분*/
					AND AAC.FuelType = TO_GetFuelType(#{Fuel}, 1)           /*유종*/
					AND AAC.SALS_YN = #{salsYn}
			) AA
			
			WHERE 1=1
				AND B.Purpose = #{Purpose}
				AND C.SALS_YN = #{salsYn}
		]]>  
		<choose>
			<!-- 이전계산용. 차량제작년도 기준 21.01.22 이지선K -->
			<!-- AND B.ElapsedYear = DATE_FORMAT(NOW(), '%Y') - SUBSTR(#{ProductDate}, 1, 4)	/*연차*/ -->
			<when test='calcTransferCost != null and calcTransferCost.equals("Y")'>
				AND B.ElapsedYear = if(DATE_FORMAT(NOW(), '%Y') - SUBSTR(#{ProductDate}, 1, 4) >= 20,20,DATE_FORMAT(NOW(), '%Y') - SUBSTR(#{ProductDate}, 1, 4)) /*20년이상차량20년고정처리*/
			</when>
			<!-- 차량상세 시세계산용. 경과년도 기준 21.04.22 이지선K -->
			<otherwise>
				AND B.ElapsedYear = X.VehicleElapsedYear_Original 	/*연차*/	
			</otherwise>
		</choose>
		<![CDATA[
			AND B.VehicleType = #{CarType}						/*차종*/
			AND B.CountryOrigin = #{CountryOrigin}				/*생산구분*/
			AND C.FuelType = TO_GetFuelType(#{Fuel},1)			/*유종*/
		]]>
    </select>