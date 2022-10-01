export interface LoaderMultiState {
    loadingState: { [key: string]: boolean };
    errorState: { [key: string]: number | string | boolean };
}