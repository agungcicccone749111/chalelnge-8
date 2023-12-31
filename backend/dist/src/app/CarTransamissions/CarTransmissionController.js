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
Object.defineProperty(exports, "__esModule", { value: true });
const CarTransmissionService_1 = require("./CarTransmissionService");
const carTransmissionRepo = new CarTransmissionService_1.CarTransmissionService();
class CarTransmissionController {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const carBrand = yield carTransmissionRepo.getAll();
            res.status(200).json({
                message: "Berhasil mendapatkan data mobil",
                data: carBrand,
            });
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                res.status(200).json({
                    message: "Berhasil mendapatkan data mobil",
                    data: yield carTransmissionRepo.getById(id),
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createBrand = req.body;
                res.status(200).json({
                    message: "Berhasil membuat mobil",
                    data: yield carTransmissionRepo.create(createBrand),
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedData = req.body;
                res.status(200).json({
                    message: "Berhasil memperbarui data mobil",
                    data: yield carTransmissionRepo.update(id, updatedData),
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = CarTransmissionController;
