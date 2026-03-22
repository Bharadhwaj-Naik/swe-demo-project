import fs from 'fs/promises' ;
import {PDFParse} from 'pdf-parse' ;

/**
 * Extract text from pdf files
 * @param {string} filepath - path to PDF file
 * @returns {promise<{text:string,numPages,number}>} 
 */

export const extractTextFromPDF = async (filepath) => {
    try{
        const dataBuffer = await fs.readFile(filepath) ;

        const parser = new PDFParse(new Uint8Array(dataBuffer)) ;
        const data = await parser.getText() ;
        
        return {
            text : data.text ,
            numPages : data.numPages ,
            info : data.info ,
        }
    }catch(error){
        console.error("PDF Parsing error : " , error) ;
        throw new Error("Failed to extract text from pdf") ;
    }
};