


type UserDataType = {
  _id: string,
  firstname: string,
  lastname: string,
  email: string
}

type VehicleDataType = {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  license: string,
  registeredBy: string,
  dateCreated: string,
  img: string,
  isVerified: boolean
}

export { UserDataType, VehicleDataType }