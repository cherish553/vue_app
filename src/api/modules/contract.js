import { http } from '@/axios'
export default {
  // 委托主审分页列表
  postMainCheckList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract/page_main_check`, { page, rows }),
  // 服务器等级分页列表
  postDictList: ({ page, rows, type = '服务等级' }) =>
    http.post(`/res/v1/dict/page`, { page, rows, type }),
  // 质量委托会审分页列表
  postQualityMeetingList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract/page_quality_check`, { page, rows }),
  // 质量委托主审分页列表
  postQualityMainList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract/page_quality_judge`, { page, rows }),
  // 质量委托批准分页列表
  postQualityApproveList: ({ page, rows }) =>
    http.post(`wjl/v1/contract/page_quality_approve`, { page, rows }),

  // 委托主审通过
  postMainCheckSubmit: ({ ids, serveGrade }) =>
    http.post(`/wjl/v1/contract/submit_from_main_check`, { ids: ids.join(','), serveGrade }),
  // 委托主审驳回
  postMainCheckBack: ({ ids, reason }) =>
    http.post(`/wjl/v1/contract/back_from_main_check`, { ids: ids.join(','), reason }),
  // 委托会审分页列表
  postMeetingCheckList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract/page_meeting_check`, { page, rows }),
  // 委托会审驳回
  postMeetingCheckBack: ({ ids, reason }) =>
    http.post(`/wjl/v1/contract/back_meeting_check`, { ids: ids.join(','), reason }),
  // 委托会审通过
  postMeetingCheckPass: ({ ids }) =>
    http.post(`/wjl/v1/contract/pass_meeting_check`, { ids: ids.join(',') }),
  // 查询 id 信息
  getContract: id => http.get(`/wjl/v1/contract/get${id}`),
  // 样品分页列表
  postContractSample: ({ page, rows, contractId }) =>
    http.post(`/wjl/v1/contract_sample/page`, { page, rows, contractId }),
  // 检测项目分页列表
  postItemPageVo: ({ page, rows, contractSampleId }) =>
    http.post(`/wjl/v1/item/page_vo`, { page, rows, contractSampleId }),
  // 委托批准分页列表
  postApproveList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract/page_approve`, { page, rows }),
  // 委托批准通过
  postApprovePass: ({ ids }) => http.post(`/wjl/v1/contract/pass_approve`, { ids: ids.join(',') }),
  // 委托批准退回
  postApprovekBack: ({ ids, reason }) =>
    http.post(`/wjl/v1/contract/back_approve`, { ids: ids.join(','), reason }),
  // 供应部审核分页
  postSupplyList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract/page_supply_department`, { page, rows }),
  // 供应部审核通过
  postSupplyPass: ({ ids }) =>
    http.post(`/wjl/v1/contract/approval_by_supply_department/`, { ids: ids.join(',') }),
  // 供应部审核驳回
  postSupplyBack: ({ ids, remark }) =>
    http.post(`/wjl/v1/contract/approval_by_supply_department_back/`, { ids: ids.join(','), remark }),
  // 质量部审核分页
  postQualityList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract/page_quality_department`, { page, rows }),
  // 质量部审核通过
  postQualityPass: ({ ids, serveGrade }) =>
    http.post(`/wjl/v1/contract/audit_and_approval_by_quality_department/`, { ids: ids.join(','), serveGrade }),
  // 质量部审核驳回
  postQualityback: ({ ids, remark }) =>
    http.post(`/wjl/v1/contract/audit_and_approval_by_quality_department_back/`, { ids: ids.join(','), remark }),
  // 型号变更审核分页列表
  postExamineList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract_detail_change/page_to_examine`, { page, rows }),
  // 型号变更审核通过
  postApprovalAdopt: ({ id }) =>
    http.post(`/wjl/v1/contract_detail_change/approval_adopt/${id}`),
  // 型号变更审核驳回
  postApprovalBack: ({ ids, remark }) =>
    http.post(`/wjl/v1/contract_detail_change/approval_back/`, { ids, remark }),
  // 型号变更审核历史分页列表
  postExamineHistoryList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract_detail_change/page_to_examine_history`, { page, rows }),
  // 变更复核分页列表
  postCheckList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract_detail_change/page_check`, { page, rows }),
  // 型号变更复核通过
  postExamineAdopt: ({ ids }) =>
    http.post(`/wjl/v1/contract_detail_change/to_examine_adopt/`, { ids }),
  // 型号变更复核驳回
  postExamineBack: ({ ids, remark }) =>
    http.post(`/wjl/v1/contract_detail_change/to_examine_back/`, { ids, remark }),
  // 历史复核分页列表
  postCheckHistoryList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract_detail_change/page_check_history`, { page, rows }),
  // 偏离申请审批分页列表
  postDeviateList: ({ page, rows }) =>
    http.post(`/wjl/v1/item/page_deviate_vo`, { page, rows }),
  // 偏离申请通过
  postDeviatePass: ({ ids }) =>
    http.post(`/wjl/v1/item/submit_deviate_pass`, { ids: ids.join(',') }),
  // 偏离申请驳回
  postDeviateBack: ({ ids, remark }) =>
    http.post(`/wjl/v1/item/submit_deviate_back`, { ids: ids.join(','), remark }),
  // 抽检 查询待审列表
  postSpotList: ({ page, rows }) =>
    http.post(`/wjl/v1/spot_check_plan/page_audit`, { page, rows }),
  // 抽检 根据 ids 提交
  postSpotPass: ({ ids }) =>
    http.post(`/wjl/v1/spot_check_plan/enable`, { ids: ids.join(',') }),
  // 抽检 根据 ids 驳回
  postSpotBack: ({ ids }) =>
    http.post(`/wjl/v1/spot_check_plan/reject`, { ids: ids.join(',') }),
  // 分包申请待审批分页列表
  postSubpackageList: ({ page, rows }) =>
    http.post(`/wjl/v1/subpackage_apply/page_vo`, { page, rows }),
  // 分包申请历史分页列表
  postSubpackageHistoryList: ({ page, rows, code }) =>
    http.post(`/wjl/v1/subpackage_apply/page_vo_history`, { page, rows, code }),
  // 分包申请审批通过
  postSubpackagePass: ({ applyIds }) =>
    http.post(`/wjl/v1/subpackage_apply/pass_apply`, { applyIds: applyIds.join(',') }),
  // 分包申请审批驳回
  postSubpackageBack: ({ applyIds, reason }) =>
    http.post(`/wjl/v1/subpackage_apply/back_apply`, { applyIds: applyIds.join(','), reason }),
  // 委托检测分包项目分页列表
  postSubpackageItem: ({ applyId, page, rows }) =>
    http.post(`/wjl/v1/item/page_subpackage_vo`, { applyId, page, rows }),
  // 处理方案评审-待评审分页列表
  postSchemeReviewList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract/page_processing_scheme_review`, { page, rows }),
  // 处理方案评审-历史评审分页列表
  postSchemeReviewHistoryList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract/page_processing_scheme_review_history`, { page, rows }),
  // 处理方案评审-通过
  postSchemeReviewPass: ({ ids }) =>
    http.post(`/wjl/v1/contract/pending_approval_adopt/`, { ids: ids.join(',') }),
  // 处理方案评审-驳回
  postSchemeReviewBack: ({ ids, remark }) =>
    http.post(`/wjl/v1/contract/pending_approval_back/`, { ids: ids.join(','), remark }),
  // 处理方案查看详情
  postHandleDetail: ({ id }) =>
    http.post(`/wjl/v1/contract/get_handle${id}`),
  // 不符合项处理蒙版分页
  postConformityMaskList: ({ page, rows, contractId }) =>
    http.post(`/wjl/v1/item/non_conformity_processing_mask`, { page, rows, contractId }),
  // 报告审核分页列表
  postReportCheckList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract/page_report_check`, { page, rows }),
  // 报告审核历史分页列表
  postReportCheckHistoryList: ({ page, rows, code }) =>
    http.post(`/wjl/v1/contract/page_report_check_history`, { page, rows, code }),
  // 报告审核提交
  postReportCheckPass: ({ ids }) =>
    http.post(`wjl/v1/contract/submit_report_check`, { ids: ids.join(',') }),
  // 报告审核退回
  postReportCheckBack: ({ ids, reason }) =>
    http.post(`wjl/v1/contract/back_report_check`, { ids: ids.join(','), reason }),
  // 预览报告查询列表
  postReportList: ({ contractId }) =>
    http.post(`/wjl/v1/contract_report/list`, { contractId }),
  // 报告会签分页列表
  postReportMeetingList: ({ page, rows }) =>
    http.post(`wjl/v1/contract/page_report_meeting_issue`, { page, rows }),
  // 报告会签通过提交
  postReportMeetingPass: ({ ids }) =>
    http.post(`/wjl/v1/contract/submit_report_meeting_issue`, { ids: ids.join(',') }),
  // 报告会签申诉提交
  postReportMeetingAppeal: ({ ids, negotiationUserName, endName, allegeDate, allegeReason }) =>
    http.post(`/wjl/v1/contract/submit_report_meeting_issue_allege?ids=${ids}`, { negotiationUserName, endName, allegeDate, allegeReason }),
  // 报告签发分页列表
  postReportIssueList: ({ page, rows }) =>
    http.post(`/wjl/v1/contract/page_report_issue`, { page, rows }),
  // 报告签发历史分页列表
  postReportIssueHistoryList: ({ page, rows, code }) =>
    http.post(`/wjl/v1/contract/page_report_issue_history`, { page, rows, code }),
  // 报告签发提交
  postReportIssuePass: ({ ids }) =>
    http.post(`/wjl/v1/contract/submit_report_issue`, { ids: ids.join(',') }),
  // 报告签发退回
  postReportIssueBack: ({ ids, reason }) =>
    http.post(`/wjl/v1/contract/back_report_issue`, { ids: ids.join(','), reason }),
  // 附件 分页列表
  postAttachmentList: ({ page, rows, contractId }) =>
    http.post(`/wjl/v1/contract_attachment/page`, { page, rows, contractId }),
  // 批量下载文件
  postAttachmentDownload: ids =>
    http.get(`/wjl/v1/contract_attachment/download_batch?ids=${ids}`),
  // 预览附件
  postAttachmentPreview: contractId =>
    http.post(`/wjl/v1/contract_attachment/preview/${contractId}`),
  // 根据 ids 删除上传的附件
  deleteAttachmentFile: ids =>
    http.delete(`/wjl/v1/contract_attachment/?ids=${ids.join(',')}`)
}
