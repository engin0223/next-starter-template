# 📊 KTÜ Grade Calculator (Statistical Evaluation)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-username/ktu-grade-calculator)

## Project Overview

This project is a **statistical grade calculator** implemented in **Next.js + TypeScript** and deployed on **Cloudflare Workers**.
It encodes Karadeniz Technical University (KTÜ) grading regulations and uses advanced statistical methods to estimate student letter grades from class exam distributions.

The application:

* Accepts midterm and final exam summary statistics (mean, standard deviation)
* Accepts the correlation coefficient $p$ between midterm and final
* Computes the weighted course score (HBN) and its distribution
* Applies KTÜ’s evaluation rules (T-score method, absolute method, faculty-specific final thresholds)

> **Note:** A custom domain has not been purchased due to financial reasons; the app is currently hosted under the free Cloudflare Workers URL. A custom domain will be added when feasible.

---

## Mathematical derivation (HBN mean & variance)

This section documents the exact mathematical formulas used in the implementation and shows how they are derived from basic variance identities for paired variables.

### Notation

* Let $X$ be the midterm score random variable (class distribution).
  Mean: $\mu_X$, standard deviation: $\sigma_X$, variance: $\operatorname{Var}(X)=\sigma_X^2$.
* Let $Y$ be the final score random variable (class distribution).
  Mean: $\mu_Y$, standard deviation: $\sigma_Y$, variance: $\operatorname{Var}(Y)=\sigma_Y^2$.
* Let $p$ be the Pearson correlation coefficient between $X$ and $Y$: $p = \operatorname{corr}(X,Y)$, where $p\in[-1,1]$.
* Let $\operatorname{Cov}(X,Y)$ denote the covariance between $X$ and $Y$.
* Weights for the course grade are fixed in this implementation: $w_1$ for midterm and $w_2$ for final. By default $w_1 = w_2 = 0.5$.

### Weighted course score (HBN)

Define the student (and class) HBN as the weighted sum:

$$
H = w_1 X + w_2 Y .
$$

#### Mean of HBN

By linearity of expectation:

$$
\mu_H = \mathbb{E}[H] = w_1 \mu_X + w_2 \mu_Y.
$$

#### Variance of HBN — derivation

Start with the variance identity for a sum of two random variables:

$$
\operatorname{Var}(X+Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) + 2\operatorname{Cov}(X,Y).
$$

For a weighted sum $H = w_1 X + w_2 Y$, apply the same identity with constants:

$$
\begin{aligned}
\operatorname{Var}(H)
&= \operatorname{Var}(w_1 X + w_2 Y) \\
&= w_1^2 \operatorname{Var}(X) + w_2^2 \operatorname{Var}(Y) + 2 w_1 w_2 \operatorname{Cov}(X,Y).
\end{aligned}
$$

We express covariance using the correlation coefficient $p$:

$$
\operatorname{Cov}(X,Y) = p\,\sigma_X\,\sigma_Y.
$$

Substitute into the variance expression to obtain the HBN variance:

$$
\boxed{\;
\operatorname{Var}(H) = w_1^2 \sigma_X^2 \;+\; w_2^2 \sigma_Y^2 \;+\; 2 w_1 w_2 p \,\sigma_X \sigma_Y\;
}
$$

Finally, the HBN standard deviation is:

$$
\sigma_H = \sqrt{\operatorname{Var}(H)}.
$$

---

## Features

* 📐 **Statistical Computation:** Full HBN mean and variance calculation using correlation.
* 🎓 **Letter Grade Prediction:** T-score system or absolute grading method based on class size.
* 🖥️ **Interactive UI:** Responsive interface with React + Tailwind CSS.
* ☁️ **Cloudflare Deployment:** Lightweight static hosting for global access.
* 🔒 **Faculty Rules:** Configurable minimum final thresholds per department.

---

## Tech Stack

* Next.js (React + TypeScript)
* Tailwind CSS
* Cloudflare Workers (static deployment)
* npm / yarn / pnpm / bun compatible

---

## Getting Started

```bash
git clone https://github.com/your-username/ktu-grade-calculator
cd ktu-grade-calculator
npm install
npm run dev
# open http://localhost:3000
```

---

## Deployment

```bash
npm run build && npm run deploy
```

---

## Why this project is CV-worthy

* Demonstrates translating **formal academic rules** into a robust algorithm
* Shows competency in **statistical reasoning, TypeScript architecture, UI design, and cloud deployment**
* Clean separation between domain logic (statistics) and presentation (Next.js UI) — production-quality coding practices
