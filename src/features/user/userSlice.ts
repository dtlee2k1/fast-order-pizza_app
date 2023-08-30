import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getAddress } from '../../services/apiGeocoding'
import { Position } from '../../types/position.type'

function getPosition() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition()
  const position: Position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude
  }

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position)
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`

  // 3) Then we return an object with the data that we are interested in
  return { position, address }
})

interface UserState {
  username: string
  status: string
  position: Position
  address: string
  error: string
}

const initialState: UserState = {
  username: '',
  status: 'idle',
  position: { latitude: 0, longitude: 0 },
  address: '',
  error: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle'
        state.position = action.payload.position
        state.address = action.payload.address
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = 'error'
        state.error = 'There was a problem getting your address. Make sure to fill this field!'
      })
  }
})

export const { updateName } = userSlice.actions

const userReducer = userSlice.reducer
export default userReducer
