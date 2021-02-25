
const SystemAlert = (e) => {
  if(typeof e === 'string') {
    alert(e)
  } else if(typeof e === 'object' && e.message) {
    alert(e.message)
  }
}

const AlertUtils = {
  SystemAlert,
}

export default AlertUtils