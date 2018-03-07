import {
  Controller,
  Post,
  Auth,
  Get,
  Required,
} from '../decorator/router'
import jwt from 'jsonwebtoken'
import {tokenKey} from '../../config'
import { insertUserData,findDataByName } from '../service/mysql-admin-service';

@Controller('/admin')
export default class AdminRouter {
  @Post('/register')
  @Required({
    body: ['name', 'password']
  })
  async adminRegister (ctx, next) {
    const { name, password } = ctx.request.body
    const result = await insertUserData(name.Trim(),password.Trim())
    console.log(result)
    return (ctx.body = result)
  }
  
  @Post('/login')
  @Required({
    body: ['name', 'password']
  })
  async adminLogin (ctx, next) {
    const { name, password } = ctx.request.body
    console.log(name,password)
    const result = await findDataByName(name.Trim(),password.Trim())
    console.log(result)
    if(result.success){
      let username = result.name
      let token = jwt.sign(username, tokenKey)
      return (ctx.body = {...result,token})
    }
    return (ctx.body = result)
  }
}
