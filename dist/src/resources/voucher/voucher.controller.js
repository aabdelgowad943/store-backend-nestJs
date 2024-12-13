"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherController = void 0;
const common_1 = require("@nestjs/common");
const voucher_service_1 = require("./voucher.service");
const create_voucher_dto_1 = require("./dto/create-voucher.dto");
const update_voucher_dto_1 = require("./dto/update-voucher.dto");
let VoucherController = class VoucherController {
    constructor(voucherService) {
        this.voucherService = voucherService;
    }
    create(createVoucherDto) {
        return this.voucherService.create(createVoucherDto);
    }
    findAll() {
        return this.voucherService.findAll();
    }
    async findBySellerId(sellerId) {
        return await this.voucherService.getVoucherBySellerId(sellerId);
    }
    findOne(id) {
        return this.voucherService.findOne(id);
    }
    update(id, updateVoucherDto) {
        return this.voucherService.update(id, updateVoucherDto);
    }
    remove(id) {
        return this.voucherService.remove(id);
    }
};
exports.VoucherController = VoucherController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_voucher_dto_1.CreateVoucherDto]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('sellerId'),
    __param(0, (0, common_1.Query)('sellerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "findBySellerId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_voucher_dto_1.UpdateVoucherDto]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "remove", null);
exports.VoucherController = VoucherController = __decorate([
    (0, common_1.Controller)('voucher'),
    __metadata("design:paramtypes", [voucher_service_1.VoucherService])
], VoucherController);
//# sourceMappingURL=voucher.controller.js.map