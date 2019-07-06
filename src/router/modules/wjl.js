const meta = { auth: false }
const wjl = {
  path: '/wjl',
  name: 'wjl',
  meta,
  component: () => import('@/components/cherish-common-top'),
  children: (pre => [
    // 研发委托主审
    { path: `${pre}main_check`, name: `${pre}contract_main_check`, component: () => import('@/page/contract/mainCheck/entrust'), meta: { ...meta, title: '研发委托主审' } },
    { path: `${pre}main_check_detail`, name: `${pre}main_check_detail`, component: () => import('@/page/contract/mainCheck/entrustDetail'), meta: { ...meta, title: '委托详情' } },
    // 研发委托会审
    { path: `${pre}meeting_check`, name: `${pre}meeting_check`, component: () => import('@/page/contract/meetingCheck/entrust'), meta: { ...meta, title: '研发委托会审' } },
    { path: `${pre}meeting_check_detail`, name: `${pre}meeting_check_detail`, component: () => import('@/page/contract/meetingCheck/entrustDetail'), meta: { ...meta, title: '委托详情' } },
    // 研发委托批准
    { path: `${pre}approve`, name: `${pre}approve`, component: () => import('@/page/contract/approve/entrust'), meta: { ...meta, title: '研发委托批准' } },
    { path: `${pre}approve_detail`, name: `${pre}approve_detail`, component: () => import('@/page/contract/approve/entrustDetail'), meta: { ...meta, title: '委托详情' } },
    // 质量委托
    { path: `quality-meeting-check`, name: `${pre}quality-meeting-check`, component: () => import('@/page/contract/qualityMeeting/entrust'), meta: { ...meta, title: '质量委托会审' } },
    { path: `quality-main-check`, name: `${pre}quality-main-check`, component: () => import('@/page/contract/qualityMain/entrust'), meta: { ...meta, title: '质量委托主审' } },
    { path: `quality-approve`, name: `${pre}quality-approve`, component: () => import('@/page/contract/qualityApprove/entrust'), meta: { ...meta, title: '质量委托批准' } },
    // 新零部件供应部审核
    { path: `supply_department_audit`, name: `supply_department_audit`, component: () => import('@/page/contract/supply/parts'), meta: { ...meta, title: '新零部件供应部审核' } },
    { path: `supply_department_detail`, name: `supply_department_detail`, component: () => import('@/page/contract/supply/partsDetail'), meta: { ...meta, title: '委托详情' } },
    // 新零部件质量审核
    { path: `quality_audit`, name: `quality_department_audit`, component: () => import('@/page/contract/quality/parts'), meta: { ...meta, title: '新零部件质量审核' } },
    { path: `quality_department_detail`, name: `quality_department_detail`, component: () => import('@/page/contract/quality/partsDetail'), meta: { ...meta, title: '委托详情' } },
    // 型号变更
    { path: `spec_change_check`, name: `spec_change_check`, component: () => import('@/page/contract/specCheck'), meta: { ...meta, title: '型号变更审核' } },
    { path: `spec_change_recheck`, name: `spec_change_recheck`, component: () => import('@/page/contract/sepcReview'), meta: { ...meta, title: '型号变更复核' } },
    // 偏离审核
    { path: `skewing_apply`, name: `skewing_apply`, component: () => import('@/page/contract/skewingApply/examine'), meta: { ...meta, title: '偏离审核' } },
    // 抽检计划审批
    { path: `sampling_plan_approval`, name: `sampling_plan_approval`, component: () => import('@/page/contract/samplingPlan/examine'), meta: { ...meta, title: '抽检计划审批' } },
    // 分包审批
    { path: `subpackage_approval`, name: `subpackage_approval`, component: () => import('@/page/contract/subpackage'), meta: { ...meta, title: '分包审批' } },
    { path: `subpackage_approval_detail`, name: `subpackage_approval_detail`, component: () => import('@/page/contract/subpackage/detail'), meta: { ...meta, title: '分包项目详情' } },
    // 方案评审
    { path: `noneconformance_deal_review`, name: `noneconformance_deal_review`, component: () => import('@/page/contract/nonconformance'), meta: { ...meta, title: '处理方案评审' } },
    { path: `noneconformance_deal_review_detail`, name: `noneconformance_deal_detail`, component: () => import('@/page/contract/nonconformance/detail'), meta: { ...meta, title: '处理方案详情' } },
    { path: `noneconformance_deal_review_histroy_detail`, name: `noneconformance_deal_review_histroy_detail`, component: () => import('@/page/contract/nonconformance/historyDetail'), meta: { ...meta, title: '处理方案详情' } },
    { path: `noneconformance_inconformity_item`, name: `noneconformance_inconformity_item`, component: () => import('@/page/contract/nonconformance/inconformity'), meta: { ...meta, title: '查看不符合项目' } },
    // 报告
    { path: `report_check`, name: `report_check`, component: () => import('@/page/contract/reportCheck'), meta: { ...meta, title: '报告审核' } },
    { path: `report_check_detail`, name: `report_check_detail`, component: () => import('@/page/contract/reportCheck/detail'), meta: { ...meta, title: '委托详情' } },
    { path: `report_sign`, name: `report_sign`, component: () => import('@/page/contract/reportSign'), meta: { ...meta, title: '报告会签' } },
    { path: `report_sign_detail`, name: `report_sign_detail`, component: () => import('@/page/contract/reportSign/detail'), meta: { ...meta, title: '委托详情' } },
    { path: `report_sign_appeal`, name: `report_sign_appeal`, component: () => import('@/page/contract/reportSign/appeal'), meta: { ...meta, title: '申诉' } },
    { path: `report_issue`, name: `report_issue`, component: () => import('@/page/contract/reportIssue'), meta: { ...meta, title: '报告签发' } },

    // 预览报告
    { path: `report_detail`, name: `report_detail`, component: () => import('@/page/contract/reportDetail') },

    // 研发委托主审、会审、批准
    // 新零部件供应部审核、质量审核
    { path: `${pre}common_sample_detail`, name: `${pre}common_sample_detail`, component: () => import('@/page/contract/commonDetail/sampleDetail'), meta: { ...meta, title: '样品详情' } },
    { path: `${pre}common_item_detail`, name: `${pre}common_item_detail`, component: () => import('@/page/contract/commonDetail/itemDetail'), meta: { ...meta, title: '样品项目详情' } },

    // 附件
    { path: `Enclosure`, name: `Enclosure`, component: () => import('@/page/contract/enclosure'), meta: { ...meta, title: '附件列表' } },
    { path: `UpLoad`, name: `UpLoad`, component: () => import('@/page/contract/enclosure/upLoad'), meta: { ...meta, title: '文件上传' } },
    { path: `FileView`, name: `FileView`, component: () => import('@/page/contract/enclosure/enclosure'), meta: { ...meta, title: '附件预览' } }
  ])('contract_')
}
export default wjl
