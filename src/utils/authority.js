// 获取整个 authority id list
export function authorityList(contents, idList) {
  contents.forEach(data => {
    idList.push(data.id)
    return authorityList(data.children, idList)
  });
  return idList
}

// 检查获取指定的权限
export function authorityCheckList(contents, ids, idList) {
  contents.forEach(data => {
    if (ids.includes(data.identifier)) {
      idList.push(data.id)
    }
    return authorityCheckList(data.children, ids, idList)
  });
  return idList
}


export function authorityLabelList(contents, ids, idList) {
  contents.forEach(data => {
    if (ids.includes(data.id) && data.children.length == 0) {
      idList.push(data.title)
    }
    return authorityLabelList(data.children, ids, idList)
  });
  return idList
}

export function displayAuthority(contents, authorities, type) {
  contents.forEach(data => {
    data['label'] = data.title
    if (authorities.indexOf(data.id) != -1 && type == "roles") {
      data['isDisabled'] = false
    }
    if (!data.children) {
      delete data['children']
    }
    else if (data.children.length == 0) {
      delete data['children']
    } else {
      return displayAuthority(data.children, authorities, type)

    }
  })
  return contents
}

export function displayNormalAuthority(contents, authorities, type) {
  contents.forEach(data => {
    data['label'] = data.title
    if (authorities.indexOf(data.id) != -1 && type == "user") {
      data['isDisabled'] = true

    }
    if (!data.children) {
      delete data['children']
    }
    else if (data.children.length == 0) {
      delete data['children']
    } else {
      return displayNormalAuthority(data.children, authorities, type)

    }
  })
  return contents
}
export function displayPersonalAuthority(contents) {
  contents.forEach(data => {
    data['label'] = data.title

    if (!data.children) {
      delete data['children']
    }
    else if (data.children.length == 0) {
      delete data['children']
    } else {
      return displayPersonalAuthority(data.children)

    }
  })
  return contents
}


// 获取最小child的id list
export function authorityChildList(contents, idList) {
  contents.forEach(data => {
    if (data.children.length == 0) {
      idList.push(data.id)
    }
    return authorityChildList(data.children, idList)
  })
  return idList
}

// 获取每个模块按钮权限
export function authorityButtonList(contents, title, permissionAll) {

  var specialPermissions = ['genie-account-merchant-plan-change-log-search', 'genie-account-list-with-plan', 'merchant-plan-plan-change-renew', 'merchant-plan-plans-get', 'merchant-plan-receipt-number-check', 'merchant-plan-save', 'merchant-plan-datetime-range-estimate', 'reopen-ticket', 'modify-ticket-issue-level', 'modify-ticket-issue-type', 'sync-all-order', 'sync-all-product', 'sync-incremental-order', 'sync-incremental-product', 'modify-ticket-assignee', 'modify-ticket-pic', 'edit-task-status', 'start-task', 'add-ticket-comment', 'complete-ticket', 'confirm-ticket', 'submit-ticket', 'get-single-ticket', 'wont-fix-ticket', 'add-role-authorities', 'edit-role-authorities', 'edit-basic-info', 'disconnect-shop', 'approve-ticket']
  contents.forEach(content => {
    if (content.identifier == title) {
      const regex = /-.+/;
      content.children.forEach(data => {
        if (specialPermissions.includes(data.identifier)) {
          switch (data.identifier) {
            case 'merchant-plan-datetime-range-estimate':
              permissionAll['planEstimate'] = ['admin', key]
              break;
            case 'merchant-plan-save':
              permissionAll['planSave'] = ['admin', key]
              break;
            case 'merchant-plan-receipt-number-check':
              permissionAll['planReceiptCheck'] = ['admin', key]
              break;
            case 'merchant-plan-plans-get':
              permissionAll['planGet'] = ['admin', key]
              break;
            case 'merchant-plan-plan-change-renew':
              permissionAll['planChangeRenew'] = ['admin', key]
              break;
            case 'genie-account-list-with-plan':
              permissionAll['genieAccountPlanList'] = ['admin', key]
              break;
            case 'genie-account-merchant-plan-change-log-search':
              permissionAll['genieAccountPlanChangeLogList'] = ['admin', key]
              break;
            case 'add-role-authorities':
              permissionAll['editNormal'] = ['admin', key]
              permissionAll['edit'] = ['admin', key]
              break;
            case 'edit-role-authorities':
              permissionAll['editAdmin'] = ['admin', key]
              permissionAll['edit'] = ['admin', key]
              break;
            case 'edit-basic-info':
              permissionAll['editInfo'] = ['admin', key]
              permissionAll['edit'] = ['admin', key]
              break;
            case 'disconnect-shop':
              permissionAll['unbind'] = ['admin', key]
              break
            case 'start-task':
              permissionAll['startTask'] = ['admin', key]
              break
            case 'sync-all-product':
              permissionAll['syncAllProduct'] = ['admin', key]
              break
            case 'modify-ticket-issue-type':
              permissionAll['modifyTicketIssueType'] = ['admin', key]
              break
            case 'modify-ticket-issue-level':
              permissionAll['modifyTicketIssueLevel'] = ['admin', key]
              break
            case 'sync-all-order':
              permissionAll['syncAllOrder'] = ['admin', key]
              break
            case 'reopen-ticket':
              permissionAll['reopenTicket'] = ['admin', key]
              break
            case 'sync-incremental-order':
              permissionAll['syncIncrementalOrder'] = ['admin', key]
              break
            case 'sync-incremental-product':
              permissionAll['syncIncrementalProduct'] = ['admin', key]
              break
            case 'edit-task-status':
              permissionAll['editTaskStatus'] = ['admin', key]
              break
            case 'approve-ticket':
              permissionAll['approveTicket'] = ['admin', key]
              break
            case 'wont-fix-ticket':
              permissionAll['wontFixTicket'] = ['admin', key]
              break
            case 'get-single-ticket':
              permissionAll['getSingleTicket'] = ['admin', key]
              break
            case 'submit-ticket':
              permissionAll['submitTicket'] = ['admin', key]
              break
            case 'complete-ticket':
              permissionAll['completeTicket'] = ['admin', key]
              break
            case 'confirm-ticket':
              permissionAll['confirmTicket'] = ['admin', key]
              break
            case 'add-ticket-comment':
              permissionAll['addTicketComment'] = ['admin', key]
              break
            case 'modify-ticket-pic':
              permissionAll['modifyTicketPic'] = ['admin', key]
              break
            case 'modify-ticket-assignee':
              permissionAll['modifyTicketAssignee'] = ['admin', key]
              break
          }
        }
        else {
          var key = data.identifier.replace(regex, '')
          switch (key) {
            case 'add':
              permissionAll['add'] = ['admin', key]
              break
            case 'delete':
              permissionAll['del'] = ['admin', key]
              break
            case 'edit':
              permissionAll['edit'] = ['admin', key]
              break
          }
        }


      })
      return permissionAll
    }
    return authorityButtonList(content.children, title, permissionAll)
  })
  return permissionAll
}


export default { authorityList, authorityChildList, authorityButtonList, displayAuthority, displayNormalAuthority, authorityLabelList, authorityCheckList }
