import supabase from "configs/supabase";
import {useSelector} from 'react-redux'

export const Id = async () => {

    const {userInfo} = useSelector(state => state.authReducer)

    let { data: orgz_users, error } = await supabase
      .from('orgz_users')
      .select('id')
      .eq('username', userInfo.username)
      .single()

      return orgz_users.id
}