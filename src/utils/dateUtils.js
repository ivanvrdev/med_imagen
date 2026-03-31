export const formateDate = (dateYMD) => {
  return dateYMD.split("-").reverse().join("/")
}

export const getCurrentDate = () => {
  return (new Date()).toISOString().split("T")[0]
}