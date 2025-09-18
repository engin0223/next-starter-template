# KTÜ Grade Calculator — Statistical Evaluation (Professional)

A professional, portfolio-quality web application that implements KTÜ's grading regulations to estimate students' letter grades using statistical methods.  
Built with **Next.js (TypeScript)**, styled with **Tailwind CSS**, and deployed as a static site on **Cloudflare Workers**.

> **Status:** Live on a free Cloudflare Workers URL. A custom domain has **not** been purchased yet due to financial reasons; a custom domain will be added when feasible.

---

## Project Summary

This application computes the course performance metric (HBN — "Hesaplanan Başarı Notu") from midterm and final exam scores and predicts the KTÜ letter grade using the official ruleset:

- For large classes (typically **n ≥ 30**), the **T-score** based system is used.
- For very small classes (**n ≤ 10**) or when the class HBN mean is high (≥ 80), the **Mutlak (absolute)** evaluation is applied.
- Faculty-specific minimum final exam thresholds are enforced (e.g., 45, 50, 60).

The app supports:
- Class statistics input (mean, standard deviation for midterm & final).
- Correlation coefficient input between exams (ρ, denoted `p` in UI).
- Student personal scores and faculty final lower bound selection.
- Clear output: predicted letter grade, HBN mean/std, and T-score when applicable.

---

## Key Technical Details

- **Framework:** Next.js (React + TypeScript)  
- **Styling:** Tailwind CSS  
- **Hosting:** Cloudflare Workers (static deployment)  
- **Source:** `src/app/page.tsx` — main UI + calculation logic  
- **Important behavior implemented:**
  - HBN computed as a weighted sum: `HBN = w1 * Midterm + w2 * Final` (current weights: `w1 = w2 = 0.5`)
  - HBN variance computed from the correlation and class standard deviations
  - T-score computed when appropriate:  
    \[
    T = \frac{\text{yourHBN} - \mu_{\text{HBN}}}{\sigma_{\text{HBN}}} \times 10 + 50
    \]

---

## Mathematical Foundation (derivation)

Let \(M\) be the midterm score random variable and \(F\) the final score random variable. We compute the HBN as a weighted sum:

\[
\text{HBN} = w_1 M + w_2 F
\]

The variance identity for a linear combination of two (possibly correlated) variables is:

\[
\boxed{\displaystyle \operatorname{Var}(aX + bY) = a^2\operatorname{Var}(X) + b^2\operatorname{Var}(Y) + 2ab\operatorname{Cov}(X,Y)}
\]

**Derivation (compact):**

1. Start from definition:
\[
\operatorname{Var}(aX+bY)=\mathbb{E}[(aX+bY-\mathbb{E}[aX+bY])^2]
\]
2. Recenter:
\[
= \mathbb{E}[(a(X-\mu_X)+b(Y-\mu_Y))^2]
\]
3. Expand square and use linearity:
\[
= a^2\mathbb{E}[(X-\mu_X)^2] + b^2\mathbb{E}[(Y-\mu_Y)^2] + 2ab\mathbb{E}[(X-\mu_X)(Y-\mu_Y)]
\]
4. Which becomes:
\[
= a^2\operatorname{Var}(X) + b^2\operatorname{Var}(Y) + 2ab\operatorname{Cov}(X,Y).
\]

Apply to HBN with \(a=w_1\), \(b=w_2\):

\[
\boxed{\displaystyle \operatorname{Var}(\text{HBN}) = w_1^2\sigma_M^2 + w_2^2\sigma_F^2 + 2w_1w_2\,\operatorname{Cov}(M,F)}
\]

If you express covariance via the correlation coefficient \( \rho \) (user input `p`) and the standard deviations:

\[
\operatorname{Cov}(M,F) = \rho\,\sigma_M\,\sigma_F
\]

then

\[
\boxed{\displaystyle \operatorname{Var}(\text{HBN}) = w_1^2\sigma_M^2 + w_2^2\sigma_F^2 + 2w_1w_2\,\rho\,\sigma_M\,\sigma_F}
\]

For the app's current fixed weights \(w_1 = w_2 = 0.5\):

\[
\operatorname{Var}(\text{HBN}) = 0.25\,\sigma_M^2 + 0.25\,\sigma_F^2 + 0.5\,\rho\,\sigma_M\,\sigma_F.
\]

Finally, the HBN standard deviation used in T-score computation is:

\[
\boxed{\displaystyle \sigma_{\text{HBN}} = \sqrt{\operatorname{Var}(\text{HBN})}}
\]

And the T-score (if applicable) is:

\[
T = \frac{\text{yourHBN} - \mu_{\text{HBN}}}{\sigma_{\text{HBN}}}\times 10 + 50.
\]

---

## How to run (dev)

```bash
git clone <repo-url>
cd <repo>
npm install
npm run dev
# open http://localhost:3000
