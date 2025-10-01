import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'mNamaz API',
      version: '1.0.0',
      description: `
        A comprehensive RESTful API for Islamic prayer (Namaz/Salah) guidance.
        
        ## Features
        - 🌍 **Multi-language Support**: 10 languages (English, Bosnian, Turkish, Albanian, German, Spanish, French, Indonesian, Russian, Urdu)
        - 📖 **Prayer Instructions**: Step-by-step guidance for all daily prayers
        - 🎵 **Audio Resources**: MP3 files for recitations and dhikr
        - 📚 **Educational Content**: Lessons covering prayer fundamentals
        
        ## Usage
        - Use the \`lang\` query parameter to specify language (en, bs, tr, al, de, es, fr, id, ru, ur)
        - School of thought is automatically determined based on language (Indonesian defaults to Shafi, others to Hanafi)
        - All responses follow a consistent JSON format with success/error indicators
      `,
      contact: {
        name: 'API Support',
        email: 'support@mnamaz.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: config.env === 'production' 
      ? [
          {
            url: `https://api.mnamaz.com/${config.api.version}`,
            description: 'Production server'
          }
        ]
      : [
          {
            url: `http://localhost:${config.port}${config.api.prefix}/${config.api.version}`,
            description: 'Development server'
          }
        ],
    components: {
      schemas: {
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indicates if the request was successful'
            },
            data: {
              type: 'object',
              description: 'Response data (present on success)'
            },
            error: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  description: 'Error code'
                },
                message: {
                  type: 'string',
                  description: 'Error message'
                },
                details: {
                  type: 'object',
                  description: 'Additional error details'
                }
              },
              description: 'Error information (present on failure)'
            },
            meta: {
              type: 'object',
              properties: {
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Response timestamp'
                },
                language: {
                  type: 'string',
                  description: 'Response language'
                },
                version: {
                  type: 'string',
                  description: 'API version'
                }
              },
              required: ['timestamp', 'version']
            }
          },
          required: ['success', 'meta']
        },
        AbdestStep: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Step number (0-8)'
            },
            image: {
              type: 'string',
              description: 'Associated image filename'
            },
            localeDict: {
              type: 'string',
              description: 'Localization dictionary key'
            },
            data: {
              type: 'array',
              items: {
                '$ref': '#/components/schemas/LocaleContent'
              },
              description: 'Step content items'
            }
          },
          required: ['id', 'image', 'data']
        },
        LocaleContent: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['title', 'text', 'arabic', 'transliteration', 'translation', 'audio'],
              description: 'Content type'
            },
            localeKey: {
              type: 'string',
              description: 'Localization key'
            },
            text: {
              type: 'string',
              description: 'Localized text content'
            },
            style: {
              type: 'object',
              description: 'Optional styling information'
            }
          },
          required: ['type', 'localeKey']
        },
        PrayerStep: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Step title (localized)'
            },
            type: {
              type: 'string',
              enum: ['stand', 'bow', 'prostrate', 'sit'],
              description: 'Prayer position type'
            },
            data: {
              type: 'array',
              items: {
                '$ref': '#/components/schemas/StepDataItem'
              },
              description: 'Step instructions - can include text with placeholders or card objects with Arabic/transliteration/translation'
            },
            images: {
              type: 'array',
              items: {
                type: 'string',
                format: 'uri'
              },
              description: 'Associated image URLs'
            },
            audio: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    description: 'Audio identifier'
                  },
                  audio: {
                    type: 'string',
                    format: 'uri',
                    description: 'Audio file URL'
                  }
                }
              },
              description: 'Audio resources for this step'
            },
            sunneti: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'Sunnah section title'
                },
                list: {
                  type: 'array',
                  items: {
                    type: 'object'
                  },
                  description: 'List of sunnah practices'
                },
                supportedLanguages: {
                  type: 'array',
                  items: {
                    type: 'string'
                  },
                  description: 'Languages that support these sunnah practices'
                }
              },
              description: 'Sunnah (recommended) practices for this step'
            },
            isOptional: {
              type: 'boolean',
              description: 'Whether this step is optional'
            }
          },
          required: ['data'],
          example: {
            title: 'Going to ruku\' (bowing)',
            data: [
              {
                text: 'Then you say ALLAHU AKBAR (ALLAH IS THE GREATEST) and bow down...',
                zikr: 'ALLAHU AKBAR',
                zikrTr: 'ALLAH IS THE GREATEST'
              },
              {
                card: true,
                title: 'Dhikr on ruku\'',
                arabic: [
                  {
                    text: 'سُبْحَانَ رَبِّيَ ٱلْعَظِيم',
                    bold: true
                  }
                ],
                transliteration: [
                  {
                    text: 'SUBHAANA RABBIY-AL-\'ADHEEM'
                  }
                ],
                translation: [
                  {
                    text: 'Glory be to my Lord, the Great'
                  }
                ],
                audio: '/api/media/audio/subhane-rabijel-azim.mp3'
              }
            ],
            images: [
              '/api/media/images/bowing.png'
            ]
          }
        },
        Lesson: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Lesson ID'
            },
            title: {
              type: 'string',
              description: 'Lesson title'
            },
            sentences: {
              type: 'array',
              items: {
                '$ref': '#/components/schemas/LocaleContent'
              },
              description: 'Lesson content'
            },
            image: {
              type: 'string',
              description: 'Associated image filename'
            }
          },
          required: ['id', 'title', 'sentences']
        },
        Dhikr: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Dhikr ID'
            },
            title: {
              type: 'string',
              description: 'Dhikr title'
            },
            arabic: {
              type: 'string',
              description: 'Arabic text'
            },
            transliteration: {
              type: 'string',
              description: 'Transliteration'
            },
            translation: {
              type: 'string',
              description: 'Translation'
            },
            audio: {
              type: 'string',
              description: 'Audio filename'
            },
            count: {
              type: 'integer',
              description: 'Recommended repetition count'
            }
          },
          required: ['id', 'title', 'arabic', 'audio']
        },
        CardContent: {
          type: 'object',
          properties: {
            card: {
              type: 'boolean',
              enum: [true],
              description: 'Indicates this is a card-type content'
            },
            title: {
              type: 'string',
              description: 'Card title (localized)'
            },
            arabic: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  text: {
                    type: 'string',
                    description: 'Arabic text in Arabic script (e.g., سُبْحَانَ رَبِّيَ ٱلْعَظِيم)'
                  },
                  bold: {
                    type: 'boolean',
                    description: 'Whether the text should be displayed in bold'
                  },
                  borderTop: {
                    type: 'boolean',
                    description: 'Whether to show a border above this text'
                  }
                },
                required: ['text']
              },
              description: 'Arabic text content (actual Arabic script)'
            },
            transliteration: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  text: {
                    type: 'string',
                    description: 'Transliteration in Latin script (e.g., SUBHAANA RABBIY-AL-\'ADHEEM)'
                  },
                  bold: {
                    type: 'boolean',
                    description: 'Whether the text should be displayed in bold'
                  }
                },
                required: ['text']
              },
              description: 'Transliteration in Latin characters'
            },
            translation: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  text: {
                    type: 'string',
                    description: 'English translation/meaning (e.g., Glory be to my Lord, the Great)'
                  },
                  bold: {
                    type: 'boolean',
                    description: 'Whether the text should be displayed in bold'
                  }
                },
                required: ['text']
              },
              description: 'Translation/meaning in the requested language'
            },
            audio: {
              type: 'string',
              description: 'Audio file URL for this content'
            }
          },
          required: ['card', 'arabic', 'transliteration', 'translation'],
          example: {
            card: true,
            title: 'Dhikr on ruku\'',
            arabic: [
              {
                text: 'سُبْحَانَ رَبِّيَ ٱلْعَظِيم',
                bold: true
              }
            ],
            transliteration: [
              {
                text: 'SUBHAANA RABBIY-AL-\'ADHEEM'
              }
            ],
            translation: [
              {
                text: 'Glory be to my Lord, the Great'
              }
            ],
            audio: '/api/media/audio/subhane-rabijel-azim.mp3'
          }
        },
        StepDataItem: {
          oneOf: [
            {
              type: 'object',
              properties: {
                text: {
                  type: 'string',
                  description: 'Localized instruction text with placeholders replaced'
                },
                zikr: {
                  type: 'string',
                  description: 'Resolved zikr transliteration (e.g., ALLAHU AKBAR)'
                },
                zikrTr: {
                  type: 'string',
                  description: 'Resolved zikr translation (e.g., ALLAH IS THE GREATEST)'
                }
              },
              required: ['text']
            },
            {
              '$ref': '#/components/schemas/CardContent'
            }
          ],
          description: 'A step data item can be either plain text with zikr/zikrTr or a card with Arabic/transliteration/translation'
        },
        AudioResource: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Audio ID'
            },
            filename: {
              type: 'string',
              description: 'Audio filename'
            },
            category: {
              type: 'string',
              enum: ['prayer', 'dhikr', 'azan', 'iqamah'],
              description: 'Audio category'
            },
            school: {
              type: 'string',
              enum: ['hanafi', 'shafi'],
              description: 'School of thought (if applicable)'
            },
            url: {
              type: 'string',
              format: 'uri',
              description: 'Audio file URL'
            }
          },
          required: ['id', 'filename', 'category', 'url']
        },
        Language: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'Language code (ISO 639-1)'
            },
            name: {
              type: 'string',
              description: 'Language name in English'
            },
            nativeName: {
              type: 'string',
              description: 'Language name in native script'
            }
          },
          required: ['code', 'name', 'nativeName']
        }
      },
      parameters: {
        LanguageParam: {
          name: 'lang',
          in: 'query',
          description: 'Language code for localized content',
          required: false,
          schema: {
            type: 'string',
            enum: ['en', 'bs', 'tr', 'al', 'de', 'es', 'fr', 'id', 'ru', 'ur'],
            default: 'en'
          }
        },
        SchoolParam: {
          name: 'school',
          in: 'query',
          description: 'School of thought (DEPRECATED: School is now automatically determined based on language)',
          required: false,
          deprecated: true,
          schema: {
            type: 'string',
            enum: ['hanafi', 'shafi'],
            default: 'hanafi'
          }
        },
        CategoryParam: {
          name: 'category',
          in: 'query',
          description: 'Audio category filter',
          required: false,
          schema: {
            type: 'string',
            enum: ['prayer', 'dhikr', 'azan', 'iqamah']
          }
        }
      },
      responses: {
        SuccessResponse: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                '$ref': '#/components/schemas/ApiResponse'
              }
            }
          }
        },
        ErrorResponse: {
          description: 'Error response',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  { '$ref': '#/components/schemas/ApiResponse' },
                  {
                    properties: {
                      success: {
                        type: 'boolean',
                        enum: [false]
                      },
                      data: {
                        not: {}
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        NotFoundResponse: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  { '$ref': '#/components/schemas/ApiResponse' },
                  {
                    properties: {
                      success: {
                        type: 'boolean',
                        enum: [false]
                      },
                      error: {
                        properties: {
                          code: {
                            type: 'string',
                            enum: ['NOT_FOUND']
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        ValidationErrorResponse: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  { '$ref': '#/components/schemas/ApiResponse' },
                  {
                    properties: {
                      success: {
                        type: 'boolean',
                        enum: [false]
                      },
                      error: {
                        properties: {
                          code: {
                            type: 'string',
                            enum: ['VALIDATION_ERROR']
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Ablution',
        description: 'Wudu (ablution) step-by-step instructions'
      },
      {
        name: 'Prayers',
        description: 'Prayer (Salah) instructions and steps'
      },
      {
        name: 'Lessons',
        description: 'Educational content about prayer fundamentals'
      },
      {
        name: 'Dhikr',
        description: 'Post-prayer remembrances and supplications'
      },
      {
        name: 'Special Prayers',
        description: 'Special occasion prayers (Eid, funeral, etc.)'
      },
      {
        name: 'Audio',
        description: 'Audio resources and streaming'
      },
      {
        name: 'Localization',
        description: 'Language support and translations'
      },
      {
        name: 'Media',
        description: 'Static media files (audio, images)'
      },
      {
        name: 'System',
        description: 'System health and configuration'
      }
    ]
  },
  apis: [
    './src/controllers/*.ts',
    './src/routes/*.ts'
  ]
};

export const specs = swaggerJsdoc(options);