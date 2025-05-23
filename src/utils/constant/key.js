
export const KeysProcessStep =  {
    orderDetailCode : 'o_1',
    drawCode : 'o_2',
    processClassId : 'o_3',
    processId : 'o_4',
    classCode : 'o_5',
    className : 'o_6',
    productionProcessStepId : 'o_7',
    stepCode : 'o_8',
    stepName : 'o_9',
    personnelId : 'o_10',
    personnelName : 'o_11',
    startDateTheory : 'o_12',
    orderId : 'o_13',
    orderDetailId : 'o_14',
    teamId : 'o_15',
    amountRemain : 'o_16',
    machineryId : 'o_17',
    machineryCode : 'o_18',
    machineryName : 'o_19',
    stepStatusOnlyOne : 'o_20'
  }

  export const StatusDiary={
    start : '1',
    end :'2'
  }

  export const ProductionExperienceTypeValueStatic ={
    typeExperience : '0',
    typeError : '1'
  }

  export const KeyGetListProductionExperience = {
    id : "o_1",
    name : "o_2",
    detail : "o_3",
    keywords : 'o_4',
    create_name : "o_5",
    create_date : "o_6",
    update_name : "o_7",
    update_date : "o_8",
    del_flag : 'o_9',
    experienceType : 'o_10',
    experienceError : 'o_11',
    experienceTypeTitle : 'o_12',
    experienceErrorTitle : 'o_13',

    orderCode : 'o_14',
    orderDetailCode : 'o_15',

    drawCode : 'o_16',

    customerCode : 'o_17',

    typeAndError : 'o_18',

    reasonError : 'o_19',
    orderId : 'o_20',
    orderDetailId : 'o_21'
}

export const AttachmentType = {
  production_experience :'5'
}

export const keyAttachment ={
  id : 'o_1',
  attachment_for_id : 'o_2',
  attachment_type : 'o_3',
  file_name : 'o_4',
  file_path : 'o_5',
  mime : 'o_6',
  size : 'o_7',
  extension : 'o_8',
  note : 'o_9',
  attachment_status : 'o_10',
  del_flag : 'o_11',
  account_create_id : 'o_12',
  create_date : 'o_13'
};

export const TypeFile ={
  image : 1,
  file : 2
}

export const TypeFmRequest ={
  farmer : '1',
  agency : '0'
}

export const TypeLevelUser={
  main_company : '0',
  company : '1',
  branch : '2',
  agency : '3',
  farmer : '4',

}

export const TypeStaticContracting={
  all : '0', // tất cả
  minus : '1', // Danh sách thu và thiếu
  plus : '2', // Danh sách thu và dư
  buy :'3' // Danh sách thu dư và đã trừ thu mua vẫn dư
}

export const KeyGetListPurchasing = {
  id: 'o_1',
  code: 'o_2',
  date: 'o_3',
  note: 'o_4',
  agency_id: 'o_5',
  agency_code: 'o_6',
  agency_name: 'o_7',
  farmer_id: 'o_8',
  farmer_code: 'o_9',
  farmer_name: 'o_10',
  create_time: 'o_11',
  create_id: 'o_12',
  update_time: 'o_13',
  update_id: 'o_14',
  create_name: 'o_15',
  total:'o_16'
}

export const KeyGetListPurchasingDetail = {
  id : 'o_1',
  purchasing_id : 'o_2',
  note : 'o_3',
  contract_id : 'o_4',
  contract_no : 'o_5',
  tree_id : 'o_6',
  tree_code : 'o_7',
  tree_name : 'o_8',
  quantity : 'o_9',
  price : 'o_10',
  total :'o_11',
  year : 'o_12',
  create_time : 'o_13',
  create_id : 'o_14',
  update_time : 'o_15',
  update_id : 'o_16',
  create_name : 'o_17'
}


export const KeyGetListRequest = {
  id : 'o_1',
  title : 'o_2',
  content :'o_3',
  isSendAll: 'o_4',
  type : 'o_5',
  create_time : 'o_6',
  create_user_id :'o_7',
  update_time : 'o_8',
  update_user_id :'o_9',
  create_user_name : 'o_10',
  agency_id : 'o_11',
  agency_code : 'o_12',
  agency_name : 'o_13',
  total_send : 'o_14',
  list_farmer_send : 'o_15',
  total_file : 'o_16',
  list_file :'o_17',
  total_feedback : 'o_18'
}

export const KeyGetListFeedback = {
  id : 'o_1',
  title : 'o_2',
  content :'o_3',
  agency_id : 'o_4',
  create_time : 'o_5',
  create_user_id :'o_6',
  update_time : 'o_7',
  update_user_id :'o_8',
  create_user_name : 'o_9',
  total_file : 'o_10',
  list_file :'o_11'
}

export const AgencyKeyGetList= {
  id : "o_1",
  company_id : "o_2",
  branch_id : "o_3",
  name : "o_4",
  code : "o_5",
  address : "o_6",
  repres_name : "o_7",
  repres_phone : "o_8",
  repres_id_number : "o_9",
  note : "o_10",
  create_time : "o_11",
  create_user_nm : "o_12",
  update_time : "o_13",
  update_user_nm : "o_14",
  company_name : "o_15",
  company_code : "o_16",
  company_business_sector : "o_17",
  company_address : "o_18",
  company_type : "o_19",
  type_content : "o_20",
  company_total_manager : "o_21",
  company_total_staff : "o_22",
  company_repres_name : "o_23",
  company_repres_phone : "o_24",
  company_repres_id_number : "o_25",
  company_charter_capital : "o_26",
  company_tax_code : "o_27",
  company_note : "o_28",
  company_business_license_number : "o_29",
  company_issue_date : "o_30",
  company_issue_place : "o_31",
  branch_company_name : "o_32",
  branch_company_code : "o_33",
  branch_company_address : "o_34",
  branch_company_repres_name : "o_35",
  branch_company_repres_phone : "o_36",
  branch_company_repres_id_number : "o_37",
  branch_company_note : "o_38",
  status : "o_39",
  status_content : "o_40",
}

export const KeyGetListContracting = {
  id: 'o_1',
  contracting_date: 'o_2',
  note: 'o_3',
  agency_id: 'o_4',
  agency_code: 'o_5',
  agency_name: 'o_6',
  farmer_id: 'o_7',
  farmer_code: 'o_8',
  farmer_name: 'o_9',
  farmer_id_number: 'o_10',
  tree_id: 'o_11',
  tree_code: 'o_12',
  tree_name: 'o_13',
  quantity: 'o_14',
  type: 'o_15',
  price: 'o_16',
  total: 'o_17',
  quantity_compare: 'o_18',
  contract_id: 'o_19',
  contract_no: 'o_20',
  year: 'o_21',
  create_id: 'o_22',
  create_time: 'o_23',
  update_date: 'o_24',
  update_id: 'o_25',
  create_name: 'o_26',
  farmer_contract_id: 'o_27',
  farmer_contract_code: 'o_28',
  farmer_contract_name: 'o_29',
  farmer_contract_id_number: 'o_30',
  quantity_contract: 'o_31',
  quantity_contracted: 'o_32',
  quantity_remain: 'o_33'
}



export const KeyGetListPurchaseAnnualQuota = {
  id : "o_1",
  company_id : "o_2",
  branch_id : "o_3",
  agency_id : "o_4",
  contract_id : "o_5",
  land_plot_id : "o_6",
  farmer_id : "o_7",
  tree_id : "o_8",
  year : "o_9",
  amount : "o_10",
  acreage : "o_11",
  config_tree_name : "o_12",
  land_plot_code : "o_13",
  contract_no : "o_14",
  farmer_code : "o_15",
  farmer_name : "o_16",
  farmer_id_number : "o_17",
  farmer_address : "o_18",
  farmer_insurance_number : "o_19",
  contract_acreage : "o_20",
  contract_register_date : "o_21",
  contract_exp_date : "o_22",
  create_time : "o_23",
  create_users_nm : "o_24",
  amount_contracted : "o_25",
  amount_remain : "o_26",
  amount_purchased : "o_27",
  amount_can_buy : "o_28",
  company_code : "o_29",
  company_name : "o_30",
  company_tax_code : "o_31",

  branch_code : "o_32",
  branch_name : "o_33",
  branch_tax_code : "o_34",

  agency_code : "o_35",
  agency_name : "o_36",
}

export const KeyGetListFarmer ={
  id : 'o_1',
  code : 'o_2',
  name :'o_3',
  type : 'o_4',
  gender : 'o_5',
  birth_date :'o_6',
  id_number : 'o_7',
  address :'o_8',
  address_current : 'o_9',
  insurance_number :'o_10',
  phone :'o_11'
}

export const ContractGetByIdKey ={
  id : "o_1",
  land_plot_id : "o_2",
  land_plot_code : "o_3",
  farmer_id : "o_4",
  farmer_code : "o_5",
  farmer_name : "o_6",
  farmer_id_number : "o_7",
  farmer_address : "o_8",
  farmer_insurance_number : "o_9",
  type : "o_10",
  dictionary_content : "o_11",
  acreage : "o_12",
  contract_no : "o_13",
  register_date : "o_14",
  exp_date : "o_15",
  name_link_file : "o_16",
  note : "o_17",
  create_time : "o_18",
  create_user_nm : "o_19",
  update_time : "o_20",
  update_user_nm : "o_21",
  wards_path_with_type : "o_22",
  land_plot_caculate_unit : "o_23",
  land_plot_acreage_conversion : "o_24",
  file_link : "o_25",
  caculate_unit : "o_26",
  acreage_conversion : "o_27",
  start_year : "o_28",
  end_year : "o_29",
  list_tree_quota : "o_30",
  acreage_land_plot : "o_31",
  code : "o_32",

  company_id :"o_33",
  branch_id :"o_34",
  agency_id :"o_35",
  agency_name :"o_36",
  agency_code :"o_37",
  list_file :"o_38",
  land_parcel_id :"o_39",
  lot_number :"o_40",
  status :"o_41",
  status_content :"o_42",
  map_number :"o_43",
  land_number :"o_44",

}

export const ContractGetListKey = {
  id : "o_1",
  land_plot_id : "o_2",
  land_plot_code : "o_3",
  farmer_id : "o_4",
  farmer_code : "o_5",
  farmer_name : "o_6",
  farmer_id_number : "o_7",
  farmer_address : "o_8",
  farmer_insurance_number : "o_9",
  type : "o_10",
  dictionary_content : "o_11",
  acreage : "o_12",
  contract_no : "o_13",
  register_date : "o_14",
  exp_date : "o_15",
  name_link_file : "o_16",
  note : "o_17",
  create_time : "o_18",
  create_user_nm : "o_19",
  update_time : "o_20",
  update_user_nm : "o_21",
  wards_path_with_type : "o_22",
  land_plot_caculate_unit : "o_23",
  land_plot_acreage_conversion : "o_24",
  file_link : "o_25",
  code : "o_26",
  caculate_unit : "o_27",
  acreage_conversion : "o_28",
  start_year : "o_29",
  end_year : "o_30",
  status : "o_31",
  status_content : "o_32",

  company_code : "o_33",
  company_name : "o_34",
  agency_code : "o_35",
  agency_name : "o_36",
  map_number : "o_37",
  land_number_json : "o_38",
}

export const KeyGetListActualFarming ={
  id : "o_1",
  company_id : "o_2",
  branch_id : "o_3",
  agency_id : "o_4",
  land_plot_id : "o_5",
  contract_id : "o_6",
  farmer_id : "o_7",
  farmer_name : "o_8",
  farmer_id_number : "o_9",
  farmer_insurance_number : "o_10",
  acreage : "o_11",
  caculate_unit : "o_12",
  acreage_conversion : "o_13",
  status : "o_14",
  note : "o_15",
  create_time : "o_16",
  create_user_nm : "o_17",
  update_time : "o_18",
  update_user_nm : "o_19",
}


export const KeyGetListRealisticCrops = {
  id : "o_1",
  land_plot_id : "o_2",
  tree_id : "o_3",
  intercropped_plants_id : "o_4",
  contract_id : "o_5",
  acreage : "o_6",
  caculate_unit : "o_7",
  acreage_conversion : "o_8",
  type : "o_9",
  company_id : "o_0",
  branch_id : "o_11",
  agency_id : "o_12",
  note : "o_13",
  total_tree : "o_14",
  create_time : "o_15",
  create_user_nm : "o_16",
  update_time : "o_17",
  update_user_nm : "o_18",
  tree_nm : "o_19",
  year : "o_20",
  welfare_fund : "o_21",
  estimated_output : "o_22",
  productivity_theory : "o_23",
  expected_output_theory : "o_24",
}