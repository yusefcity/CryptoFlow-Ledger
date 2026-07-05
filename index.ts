// CryptoFlow Ledger - Simple TypeScript Simulation
// All logic is self-contained in this single file

type TransactionType = "SEND" | "RECEIVE";

interface Transaction {
    id: number;
    type: TransactionType;
    amount: number;
    timestamp: Date;
    note: string;
}

// Wallet class manages balance and transaction history
class Wallet {
    private balance: number;
    private history: Transaction[];

    constructor(initialBalance: number = 0) {
        this.balance = initialBalance;
        this.history = [];
    }

    // Add funds to wallet
    receive(amount: number, note: string = "Incoming funds"): void {
        this.balance += amount;
        this.record("RECEIVE", amount, note);
    }

    // Send funds from wallet if balance allows
    send(amount: number, note: string = "Outgoing transfer"): void {
        if (amount > this.balance) {
            console.log("Transaction rejected: insufficient balance");
            return;
        }
        this.balance -= amount;
        this.record("SEND", amount, note);
    }

    // Internal transaction logger
    private record(type: TransactionType, amount: number, note: string): void {
        const transaction: Transaction = {
            id: this.history.length + 1,
            type,
            amount,
            timestamp: new Date(),
            note
        };

        this.history.push(transaction);
    }

    // Display wallet summary
    summary(): void {
        console.log("\n--- Wallet Summary ---");
        console.log("Current Balance:", this.balance);
        console.log("Total Transactions:", this.history.length);
    }

    // Print full history
    printHistory(): void {
        console.log("\n--- Transaction History ---");
        this.history.forEach(tx => {
            console.log(
                `[${tx.id}] ${tx.type} | ${tx.amount} | ${tx.note} | ${tx.timestamp.toISOString()}`
            );
        });
    }
}

// Simple simulation runner
class CryptoFlowApp {
    private wallet: Wallet;

    constructor() {
        this.wallet = new Wallet(100);
    }
