import express from 'express'
import { Router } from "express";
import path from 'path'

const __dirname = path.resolve()

const middlewareRouter = Router()

middlewareRouter.use(express.json())
middlewareRouter.use(express.static(path.resolve(__dirname, 'public')))
middlewareRouter.use(express.static(path.resolve(__dirname, 'src')))
middlewareRouter.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

export default middlewareRouter