var json = JSON.parse(connectorMessage.getRawData());
var currentDate = DateUtil.getCurrentDate("yyyyMMddHHmmss").toString();
var i = 0;
channelMap.put("tmp", tmp);

// MSH
tmp['MSH']['MSH.7']['MSH.7.1'] = currentDate;
tmp['MSH']['MSH.9']['MSH.9.1'] = "ORU";
tmp['MSH']['MSH.9']['MSH.9.2'] = "R01";

// effective_time_frame
if (json.effective_time_frame) 
{
	if (json.effective_time_frame.date_time) {
		tmp['OBR']['OBR.7']['OBR.7.1'] = convertISODate(json.effective_time_frame.date_time);
	}
	else if (json.effective_time_frame.time_interval) 
	{
		var ti = json.effective_time_frame.time_interval;
		if (ti.start_date_time) 
			tmp['OBR']['OBR.7']['OBR.7.1'] = convertISODate(ti.start_date_time);
		if (ti.end_date_time) 
			tmp['OBR']['OBR.8']['OBR.8.1'] = convertISODate(ti.end_date_time);
	}
}

// user_notes
if (json.user_notes) tmp['NTE']['NTE.3']['NTE.3.1'] = json.user_notes;

// activity_name (physical activity)
if ( json.activity_name && !(json.kcal_burned) ) 
{
	tmp['OBX'][0]['OBX.3']['OBX.3.1'] = "257733005";
	tmp['OBX'][0]['OBX.3']['OBX.3.2'] = "Physical activity";
	tmp['OBX'][0]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
	tmp['OBX'][0]['OBX.3']['OBX.3.4'] = "257733005";
	tmp['OBX'][0]['OBX.3']['OBX.3.5'] = "Activity (observable entity)";
	tmp['OBX'][0]['OBX.3']['OBX.3.6'] = "SCT";
	
	tmp['OBX'][0]['OBX.5']['OBX.5.1'] = json.activity_name.toString();

	if (json.distance) 
	{
		createSegmentAfter('OBX', tmp['OBX'][i]);
		i++;
		tmp['OBX'][i]['OBX.1']['OBX.1.1'] = i+1;
		tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "410668003";
		tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Distance";
		tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
		tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "410668003";
		tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Length";
		tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";

		tmp['OBX'][i]['OBX.5']['OBX.5.1'] = json.distance.value.toString();
		tmp['OBX'][i]['OBX.6']['OBX.6.1'] = json.distance.unit;
	}
} // end activity_name (physical activity)

// blood_glucose
if (json.blood_glucose) 
{
	tmp['OBX'][0]['OBX.3']['OBX.3.1'] = "365812005";
	tmp['OBX'][0]['OBX.3']['OBX.3.2'] = "Blood glucose level";
	tmp['OBX'][0]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
	tmp['OBX'][0]['OBX.3']['OBX.3.4'] = "365812005";
	tmp['OBX'][0]['OBX.3']['OBX.3.5'] = "Blood glucose level (finding)";
	tmp['OBX'][0]['OBX.3']['OBX.3.6'] = "SCT";

	tmp['OBX'][0]['OBX.5']['OBX.5.1'] = json.blood_glucose.value.toString();
	tmp['OBX'][0]['OBX.6']['OBX.6.1'] = "mg/dL";

	if (json.blood_specimen_type) 
	{
		createSegmentAfter('OBX', tmp['OBX'][i]);
		i++;
		tmp['OBX'][i]['OBX.1']['OBX.1.1'] = i+1;
		switch (json.blood_specimen_type) 
		{
			case "whole blood" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "420135007";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Whole blood";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "420135007";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Whole blood (substance)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;

			case "plasma" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "50863008";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Plasma";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "50863008";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "plasma (substance)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;

			case "serum" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "67922002";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "serum";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "67922002";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "serum (substance)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
		}
	}

	if (json.temporal_relationship_to_meal) 
	{
		createSegmentAfter('OBX', tmp['OBX'][i]);
		i++;
		tmp['OBX'][i]['OBX.1']['OBX.1.1'] = i+1;
		switch (json.temporal_relationship_to_meal) 
		{
			 case "fasting" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "16985007";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Fasting";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "16985007";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Fasting (finding)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;

			case "not fasting" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "440565004";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Not fasting";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "440565004";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Not fasting (finding)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;

			case "before meal" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "307165006";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Before meal";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "307165006";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Before meal (finding)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;

			case "after meal" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "24863003";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "After meal";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "24863003";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "After meal (finding)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;

			case "before breakfast" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "C92679";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Before breakfast";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "NCIT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "C92679";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Before breakfast(finding)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "NCI";
				break;
			case "after breakfast" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "C92687";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "After breakfast";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "NCIT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "C92687";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "After breakfast (finding)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "NCI";
				break;

			case "before lunch" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "C92681";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Before lunch";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "NCIT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "C92681";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Before lunch (finding)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "NCI";
				break;

			case "after lunch" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "C64600";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "After lunch";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "NCIT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "C64600";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "After lunch (finding)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "NCI";
				break;

			case "before dinner" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "C92682";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Before dinner";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "NCIT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "C92682";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Before dinner (finding)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "NCI";
				break;

			case "after dinner" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "C64602";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "After dinner";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "NCIT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "C64602";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "After dinner (finding)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "NCI";
		}
	}
	
	if (json.temporal_relationship_to_sleep) 
	{
		createSegmentAfter('OBX', tmp['OBX'][i]);
		i++;
		tmp['OBX'][i]['OBX.1']['OBX.1.1'] = i+1;
		switch(json.temporal_relationship_to_sleep) 
		{
			case "before sleeping" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "307155000";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Before sleeping";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "307155000";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Before sleeping (qualifier value)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;

			case "during sleep" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "309610004";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "During sleep";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "309610004";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "During sleep (qualifier value)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;

			case "on waking" :
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "307156004";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "On waking";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "307156004";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "On waking (qualifier value)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
		}
	}	
} // end blood_glucose

// blood_pressure
if (json.systolic_blood_pressure || json.diastolic_blood_pressure) 
{
	if (json.systolic_blood_pressure) 
	{
		tmp['OBX'][0]['OBX.3']['OBX.3.1'] = "271649006";
		tmp['OBX'][0]['OBX.3']['OBX.3.2'] = "Systolic blood pressure";
		tmp['OBX'][0]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
		tmp['OBX'][0]['OBX.3']['OBX.3.4'] = "271649006";
		tmp['OBX'][0]['OBX.3']['OBX.3.5'] = "Systolic blood pressure (observable entity)";
		tmp['OBX'][0]['OBX.3']['OBX.3.6'] = "SCT";
		
		tmp['OBX'][0]['OBX.5']['OBX.5.1'] = json.systolic_blood_pressure.value.toString();
		tmp['OBX'][0]['OBX.6']['OBX.6.1'] = "mmHg";
	}
	if (json.diastolic_blood_pressure) 
	{
		createSegmentAfter('OBX', tmp['OBX'][i]);
		i++;
		tmp['OBX'][i]['OBX.1']['OBX.1.1'] = i+1;
		tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "271650006";
		tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Diastolic blood pressure";
		tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
		tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "271650006";
		tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Diastolic blood pressure (observable entity)";
		tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
	
		tmp['OBX'][i]['OBX.5']['OBX.5.1'] = json.diastolic_blood_pressure.value.toString();
		tmp['OBX'][i]['OBX.6']['OBX.6.1'] = "mmHg";
	}
	if (json.position_during_measurement) 
	{
		createSegmentAfter('OBX', tmp['OBX'][i]);
		i++;
		tmp['OBX'][i]['OBX.1']['OBX.1.1'] = i+1;
		var pos = json.position_during_measurement;
		switch (pos) 
		{
			case "sitting":
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "33586001";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Sitting";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "33586001";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Sitting position";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;
				
			case "lying down":
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "102538003";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Lying down";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "102538003";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Recumbent body position";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;
								
			case "standing":
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "10904000";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Standing";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "10904000";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Orthostatic body position";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
		}
	}
} // end blood_pressure

// body_mass_index
if (json.body_mass_index) 
{
	tmp['OBX'][0]['OBX.3']['OBX.3.1'] = "60621009";
	tmp['OBX'][0]['OBX.3']['OBX.3.2'] = "BMI - body mass index";
	tmp['OBX'][0]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
	tmp['OBX'][0]['OBX.3']['OBX.3.4'] = "60621009";
	tmp['OBX'][0]['OBX.3']['OBX.3.5'] = "Body mass index (observable entity)";
	tmp['OBX'][0]['OBX.3']['OBX.3.6'] = "SCT";

	tmp['OBX'][0]['OBX.5']['OBX.5.1'] = json.body_mass_index.value.toString();
	tmp['OBX'][0]['OBX.6']['OBX.6.1'] = "kg/m2";
} // end body_mass_index

// body_height
if (json.body_height) 
{
	tmp['OBX'][0]['OBX.3']['OBX.3.1'] = "50373000";
	tmp['OBX'][0]['OBX.3']['OBX.3.2'] = "Body height";
	tmp['OBX'][0]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
	tmp['OBX'][0]['OBX.3']['OBX.3.4'] = "50373000";
	tmp['OBX'][0]['OBX.3']['OBX.3.5'] = "Body height measure (observable entity)";
	tmp['OBX'][0]['OBX.3']['OBX.3.6'] = "SCT";

	tmp['OBX'][0]['OBX.5']['OBX.5.1'] = json.body_height.value.toString();
	tmp['OBX'][0]['OBX.6']['OBX.6.1'] = json.body_height.unit;
} // end body_height

// body_weight
if (json.body_weight) 
{
	tmp['OBX'][0]['OBX.3']['OBX.3.1'] = "363808001";
	tmp['OBX'][0]['OBX.3']['OBX.3.2'] = "Body weight";
	tmp['OBX'][0]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
	tmp['OBX'][0]['OBX.3']['OBX.3.4'] = "363808001";
	tmp['OBX'][0]['OBX.3']['OBX.3.5'] = "Body weight measure (observable entity)";
	tmp['OBX'][0]['OBX.3']['OBX.3.6'] = "SCT";

	tmp['OBX'][0]['OBX.5']['OBX.5.1'] = json.body_weight.value.toString();
	tmp['OBX'][0]['OBX.6']['OBX.6.1'] = json.body_weight.unit;
} // end body_weight

// heart_rate
if (json.heart_rate) 
{
	tmp['OBX'][0]['OBX.3']['OBX.3.1'] = "363808001";
	tmp['OBX'][0]['OBX.3']['OBX.3.2'] = "Heart rate";
	tmp['OBX'][0]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
	tmp['OBX'][0]['OBX.3']['OBX.3.4'] = "363808001";
	tmp['OBX'][0]['OBX.3']['OBX.3.5'] = "Pulse rate (observable entity)";
	tmp['OBX'][0]['OBX.3']['OBX.3.6'] = "SCT";

	tmp['OBX'][0]['OBX.5']['OBX.5.1'] = json.heart_rate.value.toString();
	tmp['OBX'][0]['OBX.6']['OBX.6.1'] = "beats/min";

	if (json.temporal_relationship_to_physical_activity) 
	{
		createSegmentAfter('OBX', tmp['OBX'][i]);
		i++;
		tmp['OBX'][i]['OBX.1']['OBX.1.1'] = i+1;
		var trpa = json.temporal_relationship_to_physical_activity;
		switch (trpa)
		{
			case "at rest":
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "263678003";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "At rest";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "263678003";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "At rest (qualifier value)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;
				
			case "active":
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "55561003";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Active";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "55561003";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Active (qualifier value)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;
				
			case "before exercise":
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "307166007";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Before exercise";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "307166007";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Before exercise (qualifier value)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;
				
			case "after exercise":
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "255214003";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "After exercise";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "255214003";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "After exercise (qualifier value)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
				break;
				
			case "during exercise":
				tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "309604004";
				tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "During exercise";
				tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
				tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "309604004";
				tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "During exercise (qualifier value)";
				tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
		}
	}
} // end heart_rate

// kcal_burned
if (json.kcal_burned) 
{
	tmp['OBX'][0]['OBX.3']['OBX.3.1'] = "41981-2";
	tmp['OBX'][0]['OBX.3']['OBX.3.2'] = "Calories burned";
	tmp['OBX'][0]['OBX.3']['OBX.3.3'] = "LOINC";
	tmp['OBX'][0]['OBX.3']['OBX.3.4'] = "41981-2";
	tmp['OBX'][0]['OBX.3']['OBX.3.6'] = "LN";

	tmp['OBX'][0]['OBX.5']['OBX.5.1'] = json.kcal_burned.value.toString();
	tmp['OBX'][0]['OBX.6']['OBX.6.1'] = "kcal";

	if (json.activity_name)
	{
		createSegmentAfter('OBX', tmp['OBX'][i]);
		i++;
		tmp['OBX'][i]['OBX.1']['OBX.1.1'] = i+1;
		tmp['OBX'][i]['OBX.3']['OBX.3.1'] = "257733005";
		tmp['OBX'][i]['OBX.3']['OBX.3.2'] = "Activity";
		tmp['OBX'][i]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
		tmp['OBX'][i]['OBX.3']['OBX.3.4'] = "257733005";
		tmp['OBX'][i]['OBX.3']['OBX.3.5'] = "Activity (observable entity)";
		tmp['OBX'][i]['OBX.3']['OBX.3.6'] = "SCT";
	
		tmp['OBX'][i]['OBX.5']['OBX.5.1'] = json.activity_name.toString();
	}
} // end kcal_burned

// minutes_moderate_activity
if (json.minutes_moderate_activity) 
{
	tmp['OBX'][0]['OBX.3']['OBX.3.1'] = "103335007";
	tmp['OBX'][0]['OBX.3']['OBX.3.2'] = "Minutes moderate activity";
	tmp['OBX'][0]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
	tmp['OBX'][0]['OBX.3']['OBX.3.4'] = "103335007";
	tmp['OBX'][0]['OBX.3']['OBX.3.5'] = "Duration (qualifier value)";
	tmp['OBX'][0]['OBX.3']['OBX.3.6'] = "SCT";

	tmp['OBX'][0]['OBX.5']['OBX.5.1'] = json.minutes_moderate_activity.value.toString();
	tmp['OBX'][0]['OBX.6']['OBX.6.1'] = "min";
} // end minutes_moderate_activity

// sleep_duration
if ( json.sleep_duration ) 
{
	tmp['OBX'][0]['OBX.3']['OBX.3.1'] = "248263006";
	tmp['OBX'][0]['OBX.3']['OBX.3.2'] = "Sleep duration";
	tmp['OBX'][0]['OBX.3']['OBX.3.3'] = "SNOMED-CT";
	tmp['OBX'][0]['OBX.3']['OBX.3.4'] = "248263006";
	tmp['OBX'][0]['OBX.3']['OBX.3.5'] = "Duration of sleep (observable entity)";
	tmp['OBX'][0]['OBX.3']['OBX.3.6'] = "SCT";
	
	tmp['OBX'][0]['OBX.5']['OBX.5.1'] = json.sleep_duration.value.toString();
	tmp['OBX'][0]['OBX.6']['OBX.6.1'] = json.sleep_duration.unit;
} // end sleep_duration

// step_count
if (json.step_count) 
{
	tmp['OBX'][0]['OBX.3']['OBX.3.1'] = "55423-8";
	tmp['OBX'][0]['OBX.3']['OBX.3.2'] = "Step count";
	tmp['OBX'][0]['OBX.3']['OBX.3.3'] = "LOINC";
	tmp['OBX'][0]['OBX.3']['OBX.3.4'] = "55423-8";
	tmp['OBX'][0]['OBX.3']['OBX.3.6'] = "LN";

	tmp['OBX'][0]['OBX.5']['OBX.5.1'] = json.step_count.toString();
} // end step_count

responseMap.put("values ", SerializerFactory.getSerializer('HL7V2').fromXML(tmp).toString());