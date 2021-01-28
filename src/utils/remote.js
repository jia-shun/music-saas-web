import crudAccount from '@/api/music'

export function getAccountMailList(query) {
  var accountList = []
  if (query !== '') {
    setTimeout(() => {
      const data = {
        email: query,
        createDatetimeGreaterThanOrEquals: new Date(Date.now() - 62208000000).toISOString(),
        createDatetimeLessThanOrEquals: new Date(Date.now()).toISOString()
      }
      crudAccount.getGenieAccount(data).then(res => {
        res.data.content.forEach(element => {
          accountList.push({
            mail: element.email,
            merchantId: element.merchantId,
            id: element.id
          })
        })
      })
    }, 10)
  } else {
    accountList = []
  }
  return accountList
}

export default { getAccountMailList }

