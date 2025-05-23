/**
 * Defined all service info ---
 */
export default {
  get_list_contracting: {
    biz: 'purchasing',
    object: 'contracting',
    functNm: "get_list",
  },
  get_list_purchasing: {
    biz: 'purchasing',
    object: 'purchasing',
    functNm: "get_list",
  },

  get_list_purchasing: {
    biz: 'purchasing',
    object: 'purchasing',
    functNm: "get_list",
  },
  get_by_id_purchasing: {
    biz: 'purchasing',
    object: 'purchasing',
    functNm: "get_by_id",
  },

  get_list_purchasing_detail: {
    biz: 'purchasing',
    object: 'purchasing_detail',
    functNm: "get_list",
  },
  get_list_contracts: {
    biz: 'farmer_and_farmland',
    object: 'contracts',
    functNm: "get_list",
  },
  get_list_actual_farming: {
    biz: 'farmer_and_farmland',
    object: 'contracts',
    functNm: "get_list_actual_farming",
  },
  get_list_realistic_crops: {
    biz: 'farmer_and_farmland',
    object: 'contracts',
    functNm: "get_list_realistic_crops",
  },
  get_by_id_contracts: {
    biz: 'farmer_and_farmland',
    object: 'contracts',
    functNm: "get_by_id",
  },
  get_list_fm_request: {
    biz: "farming",
    object: "fm_request",
    functNm: "get_list",
  },
  delete_feedback: {
    biz: "farming",
    object: "fm_request",
    functNm: "delete",
  },
  get_list_farmer_send_fm_request: {
    biz: "farming",
    object: "fm_request",
    functNm: "get_list_farmer_send"
  },
  get_list_agency_send_fm_request: {
    biz: "farming",
    object: "fm_request",
    functNm: "get_list_agency_send"
  },
  get_by_id_fm_request: {
    biz: "farming",
    object: "fm_request",
    functNm: "get_by_id"
  },
  delete_fm_request: {
    biz: "farming",
    object: "fm_request",
    functNm: "delete"
  },
  get_list_feedback: {
    biz: "farming",
    object: "feedback",
    functNm: "get_list"
  },
  
  insert_fm_request: {
    biz: "farming",
    object: "fm_request",
    functNm: "insert"
  },
  insert_file: {
    biz: 'config',
    object: 'file',
    functNm: "insert",
  },
  delete_list_file: {
    biz: 'config',
    object: 'file',
    functNm: "delete_list",
  },

  insert_feedback: {
    biz: "farming",
    object: "feedback",
    functNm: "insert"
  },
  get_list_fm_request_user: {
    biz: "farming",
    object: "fm_request_user",
    functNm: "get_list"
  },
  get_list_farmer_not_send_fm_request_user: {
    biz: "farming",
    object: "fm_request_user",
    functNm: "get_list_farmer_not_send"
  },
  delete_fm_request_user: {
    biz: "farming",
    object: "fm_request_user",
    functNm: "delete"
  },
  insert_fm_request_user: {
    biz: "farming",
    object: "fm_request_user",
    functNm: "insert"
  },

  get_list_by_farmer_id_agency: {
    biz: "organizational",
    object: "agency",
    functNm: "get_list_by_farmer_id"
  },

  get_list_purcharse_annual_quota: {
    biz: 'farmer_and_farmland',
    object: 'annual_quota',
    functNm: "get_list_purcharse",
  },

  get_list_production_experience: {
    biz: 'production',
    object: 'production_experience',
    functNm: "get_list",
  },
  get_list_work_diary: {
    biz: 'production',
    object: 'work_diary',
    functNm: "get_list",
  },
  check_order_detail_code_and_staff_code: {
    biz: 'production',
    object: 'work_diary',
    functNm: "check_order_detail_code_and_staff_code",
  },

  start_work_diary: {
    biz: 'production',
    object: 'work_diary',
    functNm: "start_work_diary",
  },
  end_work_diary: {
    biz: 'production',
    object: 'work_diary',
    functNm: "end_work_diary",
  },


  get_list_production_experience: {
    biz: 'production',
    object: 'production_experience',
    functNm: "get_list",
  },
  insert_production_experience: {
    biz: 'production',
    object: 'production_experience',
    functNm: "insert",
  },

  logout_auth: {
    biz: 'admin',
    object: 'auth',
    functNm: "logout",
  },

  login_auth: {
    biz: 'admin',
    object: 'authen',
    functNm: "login",
  },
  get_list_attachments: {
    biz: 'attachment',
    object: 'attachments',
    functNm: "get_list",
  },
  insert_attachments: {
    biz: 'attachment',
    object: 'attachments',
    functNm: "insert",
  },






  LOGIN: 'browsersIndexLogin',
  GET_LIST_BUSINESS: {
    wait_approve: "approvedMobileGetlistpricerequested",
    approved: "approvedMobileGetlistpriceapproved",
    reject: "approvedMobileGetlistpricerejected",
  },
  GET_OVERVIEW_BUSINESS: {
    overview_request: "approvedMobileGetcountpricerequested",
    overview_approved: "approvedMobileGetcountpriceapproved",
    overview_reject: "approvedMobileGetcountpricerejected",
  },
  GET_LIST_PLANING: {
    wait_approve: "approvedMobileGetlistplanningrequested",
    approved: "approvedMobileGetlistplanningapproved",
    reject: "approvedMobileGetlistplanningrejected"
  },
  GET_OVERVIEW_PLANNING: {
    overview_request: "approvedMobileGetcountplanningrequested",
    overview_approved: "approvedMobileGetcountplanningapproved",
    overview_reject: "approvedMobileGetcountplanningrejected",
  },
  GET_LIST_PURCHASE: {
    wait_approve: "approvedMobileGetlistpurchasingrequested",
    approved: "approvedMobileGetlistpurchasingapproved",
    reject: "approvedMobileGetlistpurchasingrejected"
  },
  GET_OVERVIEW_PURCHASE: {
    overview_request: "approvedMobileGetcountpurchasingrequested",
    overview_approved: "approvedMobileGetcountpurchasingapproved",
    overview_reject: "approvedMobileGetcountpurchasingrejected"
  },
  GET_LIST_PUBLIC_APPROVE: {
    wait_approve: "approvedMobileGetlistmanufacturerequested",
    approved: "approvedMobileGetlistmanufactureapproved",
    reject: "approvedMobileGetlistmanufacturerejected"
  },
  GET_OVERVIEW_PUBLIC_APPROVE: {
    overview_request: "approvedMobileGetcountmanufacturerequested",
    overview_approved: "approvedMobileGetcountmanufactureapproved",
    overview_reject: "approvedMobileGetcountmanufacturerejected"
  },

  GET_LIST_CONFIRM_DEADLINE: {
    wait_approve: "approvedMobileGetlistplanningtermrequested",
    approved: "approvedMobileGetlistplanningtermapproved",
    reject: "approvedMobileGetlistplanningtermrejected"
  },
  GET_OVERVIEW_CONFIRM_DEADLINE: {
    overview_request: "approvedMobileGetcountplanningtermrequested",
    overview_approved: "approvedMobileGetcountplanningtermapproved",
    overview_reject: "approvedMobileGetcountplanningtermrejected"
  },


  GET_DETAIL_BUSINESS: 'saleIndexGetinfo',
  GET_DETAIL_PLANING: 'invoiceIndexGetinfo',
  GET_DETAIL_PURCHASE: 'invoiceIndexGetinfo',
  GET_DETAIL_PUBLIC_APPROVE: 'invoiceIndexGetinfo',
  GET_DETAIL_CONFIRM_DEADLINE: 'saleIndexGetinfo',


  APPROVE_BUSINESS: 'saleApprovedPrice',
  APPROVE_PLANING: 'invoiceApprovedComfirmed',
  APPROVE_PURCHASE: 'invoiceApprovedComfirmedpurchase',
  APPROVE_PUBLIC_APPROVE: 'invoiceApprovedConfirmedplanning',
  APPROVE_CONFIRM_DEADLINE: 'saleApprovedDate',



  REJECT_BUSINESS: 'saleApprovedCancelprice',
  REJECT_PLANING: 'invoiceApprovedReject',
  REJECT_PURCHASE: 'invoiceApprovedReject',
  REJECT_PUBLIC_APPROVE: 'invoiceApprovedRejectplanning',
  REJECT_CONFIRM_DEADLINE: 'saleApprovedCanceldate',


  GET_OVERVIEW: 'approvedMobileGetcount',

  GET_LIST_ACCOUNT: 'accountIndexGetlist',
  SETTING_ACCOUNT: 'accountIndexChangestatus',
  CHANGE_PASSWORD: 'accountIndexChangepassword'



};
