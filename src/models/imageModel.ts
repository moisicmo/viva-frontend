/* FORM PROPERTIE MODEL */
export interface FormImageModel {
    photo: File | null;
}

/*FORM PROPERTIE MODEL VALIDATIONS */
export interface FormImageValidations {
    photo: [(value: File) => boolean, string];
}