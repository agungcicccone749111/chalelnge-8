"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarBrandService = void 0;
const CarBrandModel_1 = require("./CarBrandModel");
const Repository_1 = require("../Repositories/Repository");
const NotFoundException_1 = require("../../exceptions/NotFoundException");
const ExecuteTransactionAsync_1 = __importDefault(require("../Repositories/ExecuteTransactionAsync"));
const { v4: uuidv4 } = require("uuid");
class CarBrandService {
    constructor() {
        this.carBrandRepo = new Repository_1.Repository(CarBrandModel_1.CarBrandModel);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.carBrandRepo.findAll();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const carBrand = yield this.carBrandRepo.findById(id);
            if (!carBrand)
                throw new NotFoundException_1.NotFoundException("Data car brand tidak ditemukan");
            return carBrand;
        });
    }
    create(carBrandReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, ExecuteTransactionAsync_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                const brand = {
                    id: uuidv4(),
                    name: carBrandReq.name,
                };
                return yield this.carBrandRepo.save(brand);
            }));
            return result;
        });
    }
    update(id, carBrandReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, ExecuteTransactionAsync_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                let carBrand = yield this.getById(id);
                carBrand.name = carBrandReq.name;
                return yield this.carBrandRepo.update(id, carBrand);
            }));
            return result;
        });
    }
}
exports.CarBrandService = CarBrandService;
