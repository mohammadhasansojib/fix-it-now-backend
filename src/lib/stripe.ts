import Stripe from "stripe"
import config from "../config/index.js";

export const stripe = new Stripe(config.stripe_secret_key, {
    apiVersion: "2026-06-24.dahlia",
});

