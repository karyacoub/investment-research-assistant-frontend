export class FormattingUtils {

    static formatCurrency(value: number): string {
        try {
            return new Intl.NumberFormat("en-US", { style: "currency" , currency: "USD" }).format(value);
        } catch (error) {
            console.error("Error formatting currency:", error);
            return value.toString();
        }
    }

    static formatNumberWithCommas(value: number): string {
        try {
            return value.toLocaleString("en-US");
        } catch (error) {
            console.error("Error formatting number with commas:", error);
            return value.toString();
        }
    }
}