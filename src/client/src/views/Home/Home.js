import Topbar from "@/components/Topbar/Topbar"
import Select from "@/components/Select/Select.vue"
import Input from "@/components/Input/Input.vue"
import Button from "@/components/Button/Button.vue"
import rulesUtils from "@/utils/rulesUtils"
import axios from "@/axios"
import imageConverterUtil from "@/utils/imageConverterUtil"
import AdvertisementUtils from "@/utils/AdvertisementUtils"
import config from "../../config"
import logoBureau from "@/assets/bureauto_sem_fundo.png" 

export default {
    name: "Home",
    components: {
        Topbar,
        Select,
        Input,
        Button
    },
    methods: { 
        getAds: async function() {
            const response = await axios.get("/advertisement/all")
            this.ads = response.data.data.map(ad => {
                if(!ad.adv_images) {
                    ad.adv_images =  logoBureau
                } else {
                    ad.adv_images = config.SERVER_URL+ ad.adv_images
                }
                return ad
                
            })
            this.setFilters(response.data.filters)
        },
        getAdsValues: async function() {
            const response = await axios.get("/advertisement/values")
            if (!response.data.success) console.log("Não foi possível pegar valores")
            this.adsMinValue = response.data.data[0]
            this.adsMaxValue = response.data.data[1]
        },
        searchAds: async function() {
            const response = await axios.get(`/advertisement/search/${JSON.stringify(this.filters)}`)
            this.ads = response.data.data.map(ad => {
                if(!ad.adv_images) {
                    ad.adv_images =  logoBureau
                } else {
                    ad.adv_images = config.SERVER_URL+ ad.adv_images
                }
                return ad
                
            })
            this.setFilters(response.data.filters)
        },
        setFilters: function(filters) {
            this.formCategories.brand = filters.brand.brands
            this.formCategories.model = filters.model.models
            this.formCategories.yearManModel = filters.yearModel.yearModels
            if (!this.searched) this.rangeValue = [filters.value.min, filters.value.max]
        },
        clearTermSearched: function() {
            this.filters.term = undefined
            this.searchAds()
        },
        filterValueMinMax: function(value) {
            this.filters.valueMinMax = [value[0], value[1]]
            this.$forceUpdate()
            this.searchAds()
        },
        clearAll: function() {
            this.filters.brand = undefined
            this.filters.model = undefined
            this.filters.yearManModel = undefined
            this.filters.valueMinMax = undefined
            this.filters.term = undefined
        }
    },
    data: function() {
        return {
            ads: [],
            rules: rulesUtils,
            formCategories: {
                brand: [],
                model: [],
                yearManModel: []
            },
            imageConverter: imageConverterUtil,
            AdvertisementUtils: AdvertisementUtils,
            rangeValue: [],
            adsMinValue: undefined,
            adsMaxValue: undefined,
            filters: {
                brand: undefined,
                model: undefined,
                yearManModel: undefined,
                valueMinMax: undefined,
                term: undefined,
                skip: 1,
                take: 4
            },
            searched: undefined
        }
    },
    created: function() {
        this.getAds()
        this.getAdsValues()
    },
    watch: {
        "filters.brand"() {
            this.searched = true
            this.searchAds()
        },
        "filters.model"() {
            this.searched = true
            this.searchAds()
        },
        "filters.yearManModel"() {
            this.searched = true
            this.searchAds()
        }
    }
}