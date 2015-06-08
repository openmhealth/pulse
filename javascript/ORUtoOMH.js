var json = {};
var code = msg['OBX']['OBX.3']['OBX.3.4'].toString()

if ( msg['OBX'][0]['OBX.3']['OBX.3.6'].toString() == "SCT") 
{
	switch (msg['OBX'][0]['OBX.3']['OBX.3.4'].toString()) 
	{
		// BLOOD GLUCOSE
		case "365812005":
			json = {
				"value" : parseFloat(msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(), 10),
				"units" : msg['OBX'][0]['OBX.6']['OBX.6.1'].toString()
			}	
			if (msg['OBR'] && msg['OBR']['OBR.7']['OBR.7.1'].toString()) 
			{
    				json.effective_time_frame = {
    					"date_time": convertHL7Date(msg['OBR']['OBR.7']['OBR.7.1'].toString())
    					}
    			}
			var bst;
			var trm;
			var trs;
			for each (obx in msg.OBX) 
			{
				switch (obx['OBX.3']['OBX.3.4'].toString()) 
				{				
					// Blood Specimen Type
					case "420135007":
						bst = "whole blood";
						break;
					case "50863008":
						bst = "plasma";
						break;
					case "67922002":
						bst = "serum";
						break;
		
					// Temporal Relation to Meal
					case "16985007":
						trm = "fasting";
						break;
					case "440565004":
						trm = "not fasting";
						break;
					case "307165006":
						trm = "before meal";
						break;
					case "24863003":
						trm = "after meal";
						break;
					case "C92679":
						trm = "before breakfast";
						break;
					case "C92687":
						trm = "after breakfast";
						break;
					case "C92681":
						trm = "before lunch";
						break;
					case "C64600":
						trm = "after lunch";
						break;
					case "C92682":
						trm = "before dinner";
						break;
					case "C64602":
						trm = "after dinner";
						break;
	
					// Temporal Relation to Sleep
					case "307155000":
						trs = "before sleeping";
						break;
					case "309610004":
						trs = "during sleep";
						break;
					case "307156004":
						trs = "on waking";
				}
			}
			if (bst) json.blood_specimen_type = bst;
			if (trm) json.temporal_relation_to_meal = trm;
			if (trs) json.temporal_relation_to_sleep = trs;			
			if(msg['NTE']) 
				json.user_notes = msg['NTE'][0]['NTE.3']['NTE.3.1'].toString();
				
			break;

		// BLOOD PRESSURE, SYSTOLIC (may include diastolic)
		case "271649006":	
			json = {
    				"systolic_blood_pressure": {
     		   		"value": msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(),
        				"unit": "mmHg"
    				}
			}
			var pos;
			for each (obx in msg.OBX) 
			{
				switch (obx['OBX.3']['OBX.3.4'].toString())
				{
					// Diastolic Blood Pressure
    					case "271650006":
    						json.diastolic_blood_pressure = {
        						"value": obx['OBX.5']['OBX.5.1'].toString(),
        						"unit": "mmHg"
    						}
					break;

					// Position During Measurement
					case "33586001":
						pos = "sitting";
						break;
					case "102538003":
						pos = "lying down";
						break;
					case "10904000":
						pos = "standing";
				}
			}
    			if (msg['OBR'] && msg['OBR']['OBR.7']['OBR.7.1'].toString()) 
    			{
    				json.effective_time_frame = {
    					"date_time": convertHL7Date(msg['OBR']['OBR.7']['OBR.7.1'].toString())
    					}
    			}
    			if (pos) json.position_during_measurement = pos;
    			if(msg['NTE']) 
				json.user_notes = msg['NTE'][0]['NTE.3']['NTE.3.1'].toString();
				
			break;

		// BLOOD PRESSURE, DIASTOLIC (may include systolic)
		case "271650006":	
			var pos;
			for each (obx in msg.OBX) 
			{
				switch (obx['OBX.3']['OBX.3.4'].toString()) {
					// Systolic Blood Pressure
    					case "271649006":
    						json.systolic_blood_pressure = {
        						"value": obx['OBX.5']['OBX.5.1'].toString(),
        						"unit": "mmHg"
    						}
					break;

					// Position During Measurement
					case "33586001":
						pos = "sitting";
						break;
					case "102538003":
						pos = "lying down";
						break;
					case "10904000":
						pos = "standing";
				}
			}
    			json.diastolic_blood_pressure = {
        			"value": msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(),
        			"unit": "mmHg"
    			}
    			if (msg['OBR'] && msg['OBR']['OBR.7']['OBR.7.1'].toString()) 
    			{
    				json.effective_time_frame = {
    					"date_time": convertHL7Date(msg['OBR']['OBR.7']['OBR.7.1'].toString())
    					}
    			}
    			if (pos) json.position_during_measurement = pos;
    			if(msg['NTE']) {
				json.user_notes = msg['NTE'][0]['NTE.3']['NTE.3.1'].toString();
    			}	
			break;

		// BODY HEIGHT
		case "50373000":	
			json = {
    				"body_height": {
        				"value": parseFloat(msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(), 10)
    				}
			}
    			if (msg['OBX'][0]['OBX.6']['OBX.6.1'].toString()) 
			{
				switch (msg['OBX'][0]['OBX.6']['OBX.6.1'].toString().charAt(0)) 
				{
					case "cm":
						json.body_height.units = "cm";
						break;
					case "m": 
						json.body_height.units = "m";
						break;
					case "i":
						json.body_height.units = "in";
						break;
					case "f":
						json.body_height.units = "ft";
				}
			}
    			if (msg['OBR']['OBR.7']['OBR.7.1'].toString()) 
    			{
    				json.effective_time_frame = {
    					"date_time": convertHL7Date(msg['OBR']['OBR.7']['OBR.7.1'].toString())
    					}
    			}
			break;

		// BMI - BODY MASS INDEX
		case "60621009":	
			json = {
    				"body_mass_index": {
        				"value": parseFloat(msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(), 10),
        				"unit": "kg/m2"
    				}
			}
    			if (msg['OBR'] && msg['OBR']['OBR.7']['OBR.7.1'].toString()) 
    			{
    				json.effective_time_frame = {
    					"date_time": convertHL7Date(msg['OBR']['OBR.7']['OBR.7.1'].toString())
    					}
    			}
			break;
			
		// BODY WEIGHT
		case "363808001":	
			json = {
    				"body_weight": {
     				"value": parseFloat(msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(), 10)
				}
			}
			if (msg['OBX'][0]['OBX.6']['OBX.6.1'].toString()) 
			{
				switch (msg['OBX'][0]['OBX.6']['OBX.6.1'].toString().charAt(0)) 
				{
					case "g":
						json.body_weight.units = "g";
						break;
					case "k": 
						json.body_weight.units = "kg";
						break;
					case "l":
					case "p":
						json.body_weight.units = "lb";
						break;
					case "o":
						json.body_weight.units = "oz";
				}
			}
    			if (msg['OBR'] && msg['OBR']['OBR.7']['OBR.7.1'].toString()) 
    			{
    				json.effective_time_frame = {
    					"date_time": convertHL7Date(msg['OBR']['OBR.7']['OBR.7.1'].toString())
    					}
    			}
			break;
			
		// HEART RATE
		case "78564009":
			json = {
    				"heart rate": {
     				"value": parseInt(msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(), 10),
        				"unit": msg['OBX'][0]['OBX.6']['OBX.6.1'].toString()
    				}
			}
    			if (msg['OBR'] && msg['OBR']['OBR.7']['OBR.7.1'].toString()) 
    			{
    				json.effective_time_frame = {
    					"date_time": convertHL7Date(msg['OBR']['OBR.7']['OBR.7.1'].toString())
    					}
    			}
    			var trpa;
			for each (obx in msg.OBX) 
			{
				switch (obx['OBX.3']['OBX.3.4'].toString()) 
				{
					// Temporal Relationship to Physical Activity
					case "263678003":
						trpa = "at rest";
						break;
					case "55561003":
						trpa = "active";
						break;
					case "307166007":
						trpa = "before exercise";
						break;
					case "255214003":
						trpa = "after exercise";
						break;
					case "309604004":
						trpa = "during exercise";
				}
			}
			if (trpa) json.temporal_relationship_to_physical_activity = trpa;
			if(msg['NTE'])
				json.user_notes = msg['NTE'][0]['NTE.3']['NTE.3.1'].toString();
				
			break;

		// MINUTES MODERATE ACTIVITY
		case "103335007":
			json = {
    				"minutes_moderate_activity": {
     				"value": parseInt(msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(), 10)
    				}
			}
			if (msg['OBX'][0]['OBX.6']['OBX.6.1'].toString())
			{
				switch (msg['OBX'][0]['OBX.6']['OBX.6.1'].toString().charAt(0)) 
				{
					case "s":
						json.minutes_moderate_activity.value = 
							(parseInt(msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(), 10)/60).toString();
						json.minutes_moderate_activity.units = "min";
						break;
					case "m": 
						json.minutes_moderate_activity.units = "min";
						break;
					case "h":
						json.minutes_moderate_activity.value = 
							(parseFloat(msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(), 10)*60).toString();
						json.minutes_moderate_activity.units = "min";
				}
			}
			if (msg['OBR'] && msg['OBR']['OBR.7']['OBR.7.1'].toString()) 
    			{
    				json.effective_time_frame = {
    					"date_time": convertHL7Date(msg['OBR']['OBR.7']['OBR.7.1'].toString())
    					}
    			}		
			break;

		// PHYSICAL ACTIVITY
		case "257733005":
			json = {
    				"physical_activity": {
     				"activity_name": msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(),
    				}
			}
			if (msg['OBR'] && msg['OBR']['OBR.7']['OBR.7.1'].toString()) 
    			{
    				json.effective_time_frame = {
    					"date_time": convertHL7Date(msg['OBR']['OBR.7']['OBR.7.1'].toString())
    					}
    			}		
			if (msg['OBX'][1] && msg['OBX'][1]['OBX.3']['OBX.3.4'].toString() == "410668003")
			{
				json.physical_activity.distance = {
					"value" : parseFloat(msg['OBX'][1]['OBX.5']['OBX.5.1'].toString(), 10)
				}
				if (msg['OBX'][1]['OBX.6']['OBX.6.1'].toString()) 
				{
					switch (msg['OBX'][1]['OBX.6']['OBX.6.1'].toString().toLowerCase()) 
					{
						case "meters":
						case "meter":
						case "metres":
						case "metre":
						case "m":
							json.physical_activity.distance.units = "m";
							break;
						case "kilometers":
						case "kilometer":
						case "kilometres":
						case "kilometre":
						case "km":
						case "k": 
							json.physical_activity.distance.units = "km";
							break;
						case "foot":
						case "feet":
						case "ft":
						case "f":
							json.physical_activity.distance.units = "ft";
							break;
						case "yard":
						case "yards": 
						case "yd": 
						case "y":
							json.physical_activity.distance.units = "yd";
							break;
						case "mile":
						case "miles":
						case "mi":
							json.physical_activity.distance.units = "mi";
					}
				}	
			}
			break;
			
		// SLEEP DURATION
		case "248263006":
			json = {
    				"sleep_duration": {
     				"value": parseFloat(msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(), 10)
    				}
			}
			if (msg['OBX'][0]['OBX.6']['OBX.6.1'].toString())
			{
				switch (msg['OBX'][0]['OBX.6']['OBX.6.1'].toString().charAt(0)) 
				{
					case "s":
						json.sleep_duration.units = "sec";
						break;
					case "m": 
						json.sleep_duration.units = "min";
						break;
					case "h":
						json.sleep_duration.units = "h";
				}
			}
    			if (msg['OBR'] && msg['OBR']['OBR.7']['OBR.7.1'].toString()) 
    			{
    				json.effective_time_frame = {
    					"date_time": convertHL7Date(msg['OBR']['OBR.7']['OBR.7.1'].toString())
    					}
    			}		
	} // end switch
} 
else if (msg['OBX'][0]['OBX.3']['OBX.3.6'].toString() == "LN") 
{
	switch (msg['OBX'][0]['OBX.3']['OBX.3.4'].toString()) 
	{
		// CALORIES BURNED
		case "41981-2":
			json = {
    				"kcal_burned": {
     		   		"value": parseInt(msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(), 10),
        				"unit": msg['OBX'][0]['OBX.6']['OBX.6.1'].toString()
    				}
			}
			if (msg['OBR'] && msg['OBR']['OBR.7']['OBR.7.1'].toString()) 
    			{
    				json.effective_time_frame = {
    					"date_time": convertHL7Date(msg['OBR']['OBR.7']['OBR.7.1'].toString())
    					}
    			}
			if (msg['OBX'][1] && msg['OBX'][1]['OBX.3']['OBX.3.6'].toString() == "SCT"
					&& msg['OBX'][1]['OBX.3']['OBX.3.4'].toString() == "257733005") {
						
    				json.activity_name = msg['OBX'][1]['OBX.5']['OBX.5.1'].toString();
			}	
			break;

		// STEP COUNT
		case "55423-8":
			json.step_count = parseInt(msg['OBX'][0]['OBX.5']['OBX.5.1'].toString(), 10);
			if (msg['OBR'] && msg['OBR']['OBR.7']['OBR.7.1'].toString()) 
    			{
    				json.effective_time_frame = {
    					"date_time": convertHL7Date(msg['OBR']['OBR.7']['OBR.7.1'].toString())
    					}
    			}
		
	} // end switch
}

var jObj = JSON.stringify(json);
channelMap.put("jObj", jObj);