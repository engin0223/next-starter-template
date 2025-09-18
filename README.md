# 📊 KTÜ Grade Calculator (Statistical Evaluation)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-username/ktu-grade-calculator)

## Project Overview

This project is a **statistical grade calculator** implemented in **Next.js + TypeScript** and deployed on **Cloudflare Workers**.  
It encodes the Karadeniz Technical University (KTÜ) style grading rules and uses statistical methods to estimate student letter grades from class exam distributions.

The application:
- accepts midterm and final exam summary statistics (mean, standard deviation),
- accepts the correlation coefficient `p` between midterm and final,
- computes the weighted course score (HBN) and its distribution,
- applies KTÜ’s evaluation rules (T-score method, absolute method, and faculty final thresholds).

> **Note:** A custom domain has not been purchased due to financial reasons; the app is currently hosted on the free Cloudflare Workers URL. A custom domain will be added when feasible.

---

## Mathematical derivation (HBN mean & variance)

This section documents the exact mathematical formulas used in the implementation and shows how they are derived from basic variance identities for paired variables.

### Notation

- Let \(X\) be the midterm score random variable (class distribution).  
  Mean: \(\mu_X\), standard deviation: \(\sigma_X\), variance: \(\operatorname{Var}(X)=\sigma_X^2\).
- Let \(Y\) be the final score random variable (class distribution).  
  Mean: \(\mu_Y\), standard deviation: \(\sigma_Y\), variance: \(\operatorname{Var}(Y)=\sigma_Y^2\).
- Let \(p\) be the Pearson correlation coefficient between \(X\) and \(Y\): \(p = \operatorname{corr}(X,Y)\), where \(p\in[-1,1]\).
- Let \(\operatorname{Cov}(X,Y)\) denote the covariance between \(X\) and \(Y\).
- Weights for the course grade are fixed in this implementation: \(w_1\) for midterm and \(w_2\) for final. By default \(w_1 = w_2 = 0.5\).

### Weighted course score (HBN)

Define the student (and class) HBN as the weighted sum:
\[
H = w_1 X + w_2 Y .
\]

#### Mean of HBN
By linearity of expectation:
\[
\mu_H = \mathbb{E}[H] = w_1 \mu_X + w_2 \mu_Y.
\]

#### Variance of HBN — derivation

Start with the variance identity for a sum of two random variables:
\[
\operatorname{Var}(X+Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) + 2\operatorname{Cov}(X,Y).
\]

For a weighted sum \(H = w_1 X + w_2 Y\), apply the same identity with constants:
\[
\begin{aligned}
\operatorname{Var}(H)
&= \operatorname{Var}(w_1 X + w_2 Y) \\
&= w_1^2 \operatorname{Var}(X) + w_2^2 \operatorname{Var}(Y) + 2 w_1 w_2 \operatorname{Cov}(X,Y).
\end{aligned}
\]

We express covariance using the correlation coefficient \(p\):
\[
\operatorname{Cov}(X,Y) = p\,\sigma_X\,\sigma_Y.
\]

Substitute into the variance expression to obtain the HBN variance:
\[
\boxed{\;
\operatorname{Var}(H) = w_1^2 \sigma_X^2 \;+\; w_2^2 \sigma_Y^2 \;+\; 2 w_1 w_2 p \,\sigma_X \sigma_Y\;
}
\]

Finally, the HBN standard deviation is
\[
\sigma_H = \sqrt{\operatorname{Var}(H)}.
\]

These are the exact formulas used in the application to compute the class HBN mean and standard deviation before converting a student's HBN into a T-score or an absolute grade.

### Covariance and correlation in practice

- If \(p\) is not known (not provided), a typical fallback is to assume \(p=0\) (independence) or to estimate it from raw class data when available.
- The sign of \(p\) affects \(\operatorname{Var}(H)\): positive correlation increases the variance of the weighted sum, negative correlation reduces it.

### T-score computation (for graded scaling)

When the T-score system is applied (typically for \(n \ge 30\)), a student's HBN is converted to a T-score as follows:
\[
T = 50 + 10 \cdot \frac{H_{\text{student}} - \mu_H}{\sigma_H},
\]
where \(\mu_H\) and \(\sigma_H\) are the class HBN mean and standard deviation computed above. The computed \(T\) is then mapped to a letter grade using KTÜ’s T-score tables.

---

## Features (summary)

- Formalized statistical computation using the exact variance identity for correlated paired exams.
- T-score conversion and mapping to KTÜ letter grades.
- Faculty final-exam minimum enforcement (configurable thresholds).
- Responsive UI (React + Tailwind) and TypeScript for safe, maintainable code.
- Deployed as a static app on Cloudflare Workers (free tier).

## Tech stack

- Next.js (React + TypeScript)  
- Tailwind CSS  
- Cloudflare Workers (static deploy)  
- npm / yarn / pnpm / bun compatible

## Getting started

```bash
git clone https://github.com/your-username/ktu-grade-calculator
cd ktu-grade-calculator
npm install
npm run dev
# open http://localhost:3000
