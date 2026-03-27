export const formateDate = (dateYMD) => {
  return dateYMD.split("-").reverse().join("/")
}