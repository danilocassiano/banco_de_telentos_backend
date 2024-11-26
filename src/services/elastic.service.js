"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticService = void 0;
var elasticsearch_1 = require("@elastic/elasticsearch");
var date_fns_1 = require("date-fns");
var ElasticService = /** @class */ (function () {
    function ElasticService() {
        this.client = new elasticsearch_1.Client({
            node: 'http://localhost:9200',
            headers: {
                'content-type': 'application/json; charset=UTF-8',
            },
        });
    }
    // Criar um documento
    ElasticService.prototype.create = function (index, body, id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.index({
                                index: index,
                                id: id,
                                body: __assign(__assign({}, body), { quantidade: 1 }),
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Erro ao criar documento:', error_1.meta.meta);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Atualizar um documento
    ElasticService.prototype.update = function (index, id, log) {
        return __awaiter(this, void 0, void 0, function () {
            var quantidadeAtual, date, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('Atualizando documento:', id);
                        quantidadeAtual = log.quantidade || 0;
                        date = new Date();
                        return [4 /*yield*/, this.client.update({
                                index: index,
                                id: id,
                                body: {
                                    doc: {
                                        quantidade: quantidadeAtual + 1,
                                        updateAt: (0, date_fns_1.format)(date, 'dd-MM-yyyy  hh:mm:ss:SSS'),
                                    },
                                },
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Erro ao atualizar documento:', error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Buscar um documento
    ElasticService.prototype.findOne = function (index, id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 6]);
                        return [4 /*yield*/, this.client.get({
                                index: index,
                                id: id,
                            })];
                    case 1:
                        result = _e.sent();
                        return [2 /*return*/, result.body._source || null]; // Retornar os dados do documento encontrado
                    case 2:
                        error_3 = _e.sent();
                        if (!(((_c = (_b = (_a = error_3.meta) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.type) === 'index_not_found_exception')) return [3 /*break*/, 4];
                        console.log('Índice não encontrado, criando automaticamente...');
                        return [4 /*yield*/, this.createIndex(index)];
                    case 3:
                        _e.sent(); // Criar o índice automaticamente
                        return [2 /*return*/, null]; // Retornar null para indicar que o documento não existe
                    case 4:
                        if (((_d = error_3.meta) === null || _d === void 0 ? void 0 : _d.statusCode) === 404) {
                            console.log('Documento não encontrado.');
                            return [2 /*return*/, null]; // Documento não encontrado
                        }
                        _e.label = 5;
                    case 5:
                        console.error('Erro ao buscar documento:', error_3);
                        throw error_3; // Repassar outros erros
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Criar um índice com mapeamento inicial
    ElasticService.prototype.createIndex = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.indices.create({
                                index: index,
                            })];
                    case 1:
                        _a.sent();
                        console.log("\u00CDndice \"".concat(index, "\" criado com sucesso."));
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error("Erro ao criar \u00EDndice \"".concat(index, "\":"), error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ElasticService;
}());
exports.ElasticService = ElasticService;
