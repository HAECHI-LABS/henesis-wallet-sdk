import express from 'express';
import { Controller } from '../types';

export default class WalletController implements Controller {
  private path = '/api/v1/wallets';

  private router = express.Router();

  getRoutes(): express.Router {
    return undefined;
  }
}
