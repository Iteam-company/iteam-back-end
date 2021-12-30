import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from "@loopback/repository";
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  SchemaObject,
} from "@loopback/rest";

import {inject} from '@loopback/core';
import {Response, RestBindings} from '@loopback/rest';
import { compare, encrypt } from "../shared/bcrypt.shared";

import { Users } from "../models";
import { UserRepository } from "../repositories";
import UserLoginSchema from "../schemas/userLogin.schema";

import { AllowedEmailsRepository } from "../repositories";

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(AllowedEmailsRepository)
    public allowedEmailsRepository: AllowedEmailsRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response
  ) {}

  @post("/users/login")
  async login(
    @requestBody({
      description: "Required input for login",
      required: true,
      content: {
        "application/json": { schema: UserLoginSchema as SchemaObject },
      },
    })
    credentials: any
  ): Promise<any> {
    const {email, password} = credentials;

    const isAllowed = await this.userRepository.findOne({where: {email}});
    if(!isAllowed) return this.response.status(401).json({msg: "You are not allowed to pass, please ask admin to have access"});

    const user: any = await this.userRepository.findOne({where: {email}});
    if (!user) return this.response.status(401).json({msg: "Credentilas are wrong"});

    const isMatched =  await compare(password, user.password);
    if (!isMatched) return this.response.status(401).json({msg: "Credentilas are wrong"});

    return this.response.status(200).json({user});
  }

  @post("/users/registration")
  @response(200, {
    description: "User model instance",
    content: { "application/json": { schema: getModelSchemaRef(Users) } },
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Users, {
            title: "NewUser",
            exclude: ["id"],
          }),
        },
      },
    })
    user: Omit<Users, "id">
  ): Promise<any> {
    console.log("USER", user);
    const {email, password} = user;

    const isAllowed = await this.allowedEmailsRepository.findOne({where: {email}});

    if(!isAllowed) return this.response.status(401).json({msg: "You are not allowed to pass, please ask admin to have access"});

    const hashedPassword = await encrypt(password);
    user.password = hashedPassword;

    return this.userRepository.create(user);
  }

  @get("/users")
  @response(200, {
    description: "Array of User model instances",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: getModelSchemaRef(Users, { includeRelations: true }),
        },
      },
    },
  })
  async find(@param.filter(Users) filter?: Filter<Users>): Promise<Users[]> {
    return this.userRepository.find(filter);
  }

  @patch("/users")
  @response(200, {
    description: "User PATCH success count",
    content: { "application/json": { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Users, { partial: true }),
        },
      },
    })
    user: Users,
    @param.where(Users) where?: Where<Users>
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get("/users/{id}")
  @response(200, {
    description: "User model instance",
    content: {
      "application/json": {
        schema: getModelSchemaRef(Users, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number("id") id: number,
    @param.filter(Users, { exclude: "where" })
    filter?: FilterExcludingWhere<Users>
  ): Promise<Users> {
    return this.userRepository.findById(id, filter);
  }

  @patch("/users/{id}")
  @response(204, {
    description: "User PATCH success",
  })
  async updateById(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Users, { partial: true }),
        },
      },
    })
    user: Users
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put("/users/{id}")
  @response(204, {
    description: "User PUT success",
  })
  async replaceById(
    @param.path.number("id") id: number,
    @requestBody() user: Users
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del("/users/{id}")
  @response(204, {
    description: "User DELETE success",
  })
  async deleteById(@param.path.number("id") id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
