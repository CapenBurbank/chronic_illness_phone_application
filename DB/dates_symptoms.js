import {user_DB_class} from '../main/login';
import {Alert} from 'react-native';

class Dates_Symptoms {
    constructor() {
        this.symptom = undefined; 
        this.symptom_array = [];
        this.day = undefined;
        this.month = undefined;
        this.year = undefined;
        this.exact_Time = undefined;
    }

    clearData() {
        this.symptom = undefined; 
        this.symptom_array = [];
        this.day_of_week = undefined;
        this.day = undefined;
        this.month = undefined;
        this.year = undefined;
        this.exact_Time = undefined;
    }

    clearDate() {
        this.day = undefined;
        this.month = undefined;
        this.year = undefined;
        this.day_of_week = undefined;
        this.exact_Time = undefined;
    }

    /**
     * 
     * noSQL firebase query that adds a new anonymous symptom object sctructured as shown below:
     * 
     * ex:
     * 
     *      {
     *          symptom: this.symptom, 
                year: this.year,
                month: this.month,
                day: this.day,
                severity: severity, 
                additional_notes: notes
     *      }
     * 
     * @param {int} severity 
     * @param {string} notes 
     */

    enter_Symptom(severity, notes) {
        if (notes == "" || notes == "Any Notes...?") {
            notes == "none"
        }
        var collection = user_DB_class.database.collection('application_database');
        var user_doc = collection.doc(user_DB_class.username);
        var user_doc_collection = user_doc.collection(`${user_DB_class.username}_symptoms`);
        
        user_doc_collection
            .doc()
            .set({
                symptom: this.symptom,
                year: this.year,
                month: this.month,
                day: this.day,
                severity: severity,
                additional_notes: notes
            })
            .then(()=> {
                setTimeout(()=>{
                    this.symptom = undefined;
                    this.symptom_array= [];
                }, 100)
            })
            .catch(()=> {
                //err here

            })
    }

    /**
     * 
     * asynchronous noSQL firebase query
     * 
     * gathers all symptom data relevant to the specified symptom and month, and will chronoligically organize each data object into this.symptom_array, used for symptom data analysis
     * 
     * @param {string} symptom 
     * @param {int} month 
     * 
     */

    async order_Data_By_Day(symptom, month) {

        month =4;

        var collection = user_DB_class.database.collection('application_database');
        var user_doc = collection.doc(user_DB_class.username);
        var user_doc_collection = user_doc.collection(`${user_DB_class.username}_symptoms`);

        // array of objects containing data fields organized by symptom 
        const snapshot = await user_doc_collection.where('symptom','==',symptom).where('year','==',this.year).where('month','==', month).get();
        var data = snapshot.docs.map(doc => doc.data());
        
        var symptomOrderByDayInMonth = [];
        
        data.forEach(object => symptomOrderByDayInMonth.push(object.day));

        var sorted = symptomOrderByDayInMonth.sort((a, b)=> {return a-b});

        var final_array = [];

        const sortMainList = async () => {
            for (var i = 0; i < data.length; i++) {
                var x = sorted[i];
                for (var j = 0; j < data.length; j++) {
                    var y = data[j];
                    if (data[j].day == sorted[i]) {
                        final_array.push(data[j]);
                    }
                }
            }
        }
        sortMainList().then(()=> {
            this.symptom_array = final_array;
        })
        .catch(()=> {
            // error handling not yet implemented
        })
    }

    /**
     * accesses Date javascript object to update variables to most recent date/time when invoked
     */

    setCurrentDateAndTime() {
        const date = new Date;
        this.day = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear();
        this.exact_Time = date.getTime();
        this.exact_Time = this.exact_Time.toString();
    }

    /** 
     * used to alter month, day, and year values from custom input in symptom logger componenet 
     *  
     * @param {int} day 
     * @param {int} month 
     * @param {int} year 
     */
    customDateFormat(day, month, year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }
    
}

export {Dates_Symptoms};