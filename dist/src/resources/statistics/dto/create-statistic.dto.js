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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStatisticsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateStatisticsDto {
}
exports.CreateStatisticsDto = CreateStatisticsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Seller ID',
        example: '60d5f8e6b8f22b6f218ebae4',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStatisticsDto.prototype, "sellerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total sales of the seller', example: 150 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStatisticsDto.prototype, "totalSales", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total earnings of the seller', example: 2500.5 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStatisticsDto.prototype, "totalEarnings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Top selling book ID (optional)',
        example: '60d5f8e6b8f22b6f218ebae5',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStatisticsDto.prototype, "topSellingBookId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total vouchers created by the seller',
        example: 30,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStatisticsDto.prototype, "totalVouchersCreated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total vouchers used by the seller',
        example: 25,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStatisticsDto.prototype, "totalVouchersUsed", void 0);
//# sourceMappingURL=create-statistic.dto.js.map