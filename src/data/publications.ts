export interface Publication {
  slug: string;
  title: string;
  year: number;
  conference: string;
  citations: number;
  /** Short hand-written summary, shown in the collapsed list view. */
  abstract: string;
  /** Optional full official abstract. If absent, build-time fetch fills it from arXiv when arxiv URL is set. Shown when the entry is expanded. */
  fullAbstract?: string;
  link?: string;
  code?: string;
  arxiv?: string;
  /** HuggingFace model / dataset URL for checkpoints + artifacts tied to this paper. */
  huggingface?: string;
  /** Slug of the matching `/projects` card. Adds a "See it as a project" link
   *  so a reader of the paper can jump to the practitioner-facing view. */
  projectSlug?: string;
  /** Optional explicit date. When omitted, the RSS feed derives Dec 31 of `year`. */
  publishedAt?: Date;
}

// Add new papers at the TOP (lowest index) so they appear first.
export const publications: Publication[] = [
  {
    slug: "explore-2026",
    title: "ExPLoRe: Expert Patch-Level Loss Routing for Multi-Objective Masked Image Modeling",
    year: 2026,
    conference: "ECCV 2026",
    citations: 0,
    abstract:
      "ExPLoRe repurposes Soft Mixture of Experts (MoE) dispatch weights as learned, per-patch loss coefficients for multi-objective masked image modeling. Loss-coupling lets gradients flow through dispatch weights to the router, enabling content-dependent specialization where different patches receive different emphases across training objectives. ViT-Base + CLIP-B/16 teacher reaches 80.6% linear probe and 85.3% finetuning accuracy on ImageNet-1K.",
    fullAbstract:
      "Multi-objective masked image modeling (MIM) combines complementary learning signals (token distillation, CLS alignment, and pixel reconstruction) but existing methods weight these objectives with global scalars, ignoring spatial heterogeneity across patches. We present ExPLoRe (Expert Patch-Level Loss Routing), which repurposes Soft Mixture of Experts (MoE) dispatch weights as learned, per-patch loss coefficients. The key mechanism is loss-coupling: allowing loss gradients to flow through dispatch weights to the router enables content-dependent specialization, where different patches receive different emphases across objectives. A detach ablation confirms loss-coupling as the core mechanism, degrading performance by 1.6% when gradients are blocked. On ImageNet-1K with ViT-Base, ExPLoRe improves over non-MoE baselines on two objective combinations (Token+CLS: +0.5% k-NN, +4.4% linear probe; Token+Pixel: +2.2% k-NN), achieving 80.6% linear probe and 85.3% finetuning accuracy, competitive with published methods. For downstream transfer, we develop adaptation recipes (Freeze Routing, Expert Dropout, and Freeze Attention) that improve MoE finetuning by +1.5% over the vanilla MoE, and close a 2.5–2.9 mIoU segmentation gap so that MoE models match or exceed non-MoE baselines on ADE20K.",
    link: "https://doi.org/10.1007/978-3-032-37314-4_16",
    arxiv: "https://arxiv.org/abs/2606.31201",
    code: "https://github.com/aicip/ExPLoRe",
    projectSlug: "explore",
  },
  {
    slug: "medic-2026",
    title: "MEDiC: Multi-objective Exploration of Distillation from CLIP",
    year: 2026,
    conference: "arXiv preprint",
    citations: 0,
    abstract:
      "MEDiC introduces a multi-objective framework for distilling knowledge from CLIP into smaller, task-specific models for remote sensing applications. By jointly optimizing multiple objectives during distillation, the method achieves strong performance on downstream tasks while significantly reducing computational requirements.",
    fullAbstract:
      "Masked image modeling (MIM) methods typically operate in either raw pixel space (reconstructing masked patches) or latent feature space (aligning with a pre-trained teacher). We present MEDiC (Multi-objective Exploration of Distillation from CLIP), a framework that combines both spaces in a single pipeline through three complementary objectives: patch-level token distillation from a frozen CLIP encoder, global CLS alignment, and pixel reconstruction via a lightweight decoder. We conduct a systematic investigation of the design space surrounding this multi-objective framework. First, we show that all three objectives provide complementary information, with the full combination reaching 73.9% kNN accuracy on ImageNet-1K. Second, we introduce hierarchical clustering with relative position bias for evolved masking and find that, despite producing more semantically coherent masks than prior methods, evolved masking does not outperform simple block masking in the teacher-guided distillation setting, a finding we attribute to the teacher's inherent semantic awareness. Third, we reveal that optimal scalar loss weights are extremely fragile, with small perturbations causing drops of up to 17 percentage points in kNN accuracy. Our framework achieves 73.9% kNN and 85.1% fine-tuning accuracy with ViT-Base at 300 epochs.",
    arxiv: "https://arxiv.org/abs/2603.29009",
    code: "https://github.com/aicip/MEDiC",
    huggingface: "https://huggingface.co/drkostas/MEDiC-ViT-Base",
    projectSlug: "medic",
  },
  {
    slug: "trustworthy-ai-dementia-2025",
    title:
      "Trustworthy AI for Early Dementia Detection: Robust Feature Masking and Clinical Interpretability",
    year: 2025,
    conference: "IEEE/ACM CHASE 2025",
    citations: 0,
    abstract:
      "This work presents a trustworthy AI approach for early dementia detection, focusing on robust feature masking techniques and clinical interpretability to ensure reliable and transparent diagnostic support systems.",
    fullAbstract:
      "Early dementia detection is pivotal for timely clinical interventions that can delay cognitive decline and improve patient quality of life. However, many machine learning models exhibit fragility by depending too heavily on a small subset of features, reducing both robustness and interpretability-particularly when data quality or completeness varies. To address this issue, we introduce a random feature masking strategy that deliberately obscures some inputs during training to encourage broader and more balanced feature usage. This approach improves resilience to missing or degraded data and enhances clinical trustworthiness by producing more interpretable outputs. We demonstrate our method on the Women's Health Initiative Memory Study (WHIMS) dataset using Transformer and Neural Ordinary Differential Equation (Neural ODE) models under two dataset configurations. Evaluations based on Macro F1 and SHAP-based feature importance show that random masking notably improves both robustness and interpretability, reducing dependence on dominant features while maintaining or boosting predictive performance. These results highlight the clinical potential of random feature masking in creating reliable, interpretable models for early dementia detection, pointing toward more trustworthy AI-driven healthcare solutions.",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&citation_for_view=b___QQ8AAAAJ:Tyk-4Ss8FVUC",
  },
  {
    slug: "teaching-assistant-pseudo-labels-2025",
    title:
      'Adding a teaching "assistant": improving the quality of pseudo-labels for semi-supervised object detection',
    year: 2025,
    conference: "Revista Tecnología en Marcha",
    citations: 0,
    abstract:
      "This paper introduces a novel approach to semi-supervised object detection by incorporating a teaching assistant mechanism to improve the quality of pseudo-labels, enhancing overall model performance and reliability.",
    fullAbstract:
      "This paper focuses on semi-supervised object detection (SS-OD) for its tolerance to small amounts of training samples, which is common in real-world applications. Pseudo-label-based approaches have been the mainstream for SS-OD. In this paper, we first show the impact of accurate pseudo-labeling and the challenge of producing such labels. In contrast to prior research that predominantly focused on refining the main model to enhance localization, this paper introduces a novel strategy, where a standalone “Teaching Assistant” or simply “Assistant” is involved in the popular Teacher/Student paradigm to improve the quality of pseudo-labels. This “Assistant” can be plugged into any existing Teacher/Student-based framework without having to fine-tune the original Teacher/Student model. We exploit two “Assistant” models, both of which center around the non-maximum suppression (NMS) method -- a popular technique used to select only the promising bounding boxes. The first “Assistant” model is referred to as the “pre-NMS” assistant that refines the candidate bounding box scores for a better set of inputs to the NMS process. The second “Assistant” model is referred to as the “post-NMS” assistant which takes advantage of SOTA segmentation models to improve the output from the NMS process. We thoroughly evaluate the performance of pre-NMS vs. post-NMS and the impact of improved pseudo-labels on the OD performance. Experimental results on the COCO dataset demonstrate that post-NMS is better than SOTA methods.",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&citation_for_view=b___QQ8AAAAJ:UeHWp8X0CEIC",
  },
  {
    slug: "koopman-transition-2024",
    title:
      "Koopman-Based Transition Detection in Satellite Imagery: Unveiling Construction Phase Dynamics Through Material Histogram Analysis",
    year: 2024,
    conference: "IEEE/IGARSS 2024",
    citations: 0,
    abstract:
      "We reformulate construction phase classification as a transition detection problem and introduce a Koopman-Based Transition Detection (KTD) method that applies Koopman operator theory to analyze the nonlinear dynamics of material histograms in a linear framework. KTD employs a sliding window with Dynamic Mode Decomposition (DMD) on time-series material histograms and detects transition points by analyzing eigenvalue movement. Compared to CNN-based methods, KTD demonstrates enhanced accuracy and reduced temporal error.",
    fullAbstract:
      "In terms of monitoring and managing anthropogenic activities, accurately identifying the distinct phases in construction projects using satellite imagery remains a challenging task. In this paper, we reformulate the phase classification problem into a transition detection problem and introduce a novel Koopman-based Transition Detection (KTD) method, which applies Koopman operator theory to analyze the nonlinear dynamics of material histograms in a linear framework. KTD employs a sliding window to perform Dynamic Mode Decomposition (DMD) on the time-series material histograms and detects the transition point by analyzing the movement of the eigenvalue in consecutive strides. Compared to CNN-based methods, our proposed KTD method demonstrates enhanced accuracy and reduced temporal error in phase identification. Furthermore, as an unsupervised method that does not require large amounts of training data, it shows a better generalization capability in the sequestered region.",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&sortby=pubdate&authuser=3&citation_for_view=b___QQ8AAAAJ:qjMakFHDy7sC",
  },
  {
    slug: "multiscale-rs-finetuning-2024",
    title:
      "Advancing Multi-Scale Remote Sensing Analysis Through Self-Supervised Learning Fine-Tuning Strategies",
    year: 2024,
    conference: "IEEE/IGARSS 2024",
    citations: 0,
    abstract:
      "This research focuses on improving the fine-tuning process of self-supervised learning models for remote sensing, particularly the Cross-Scale Masked Auto-Encoder (MAE). We tackle the challenges of intricate, multi-source imagery and present advancements in adapting the Cross-Scale MAE for diverse remote sensing environments.",
    fullAbstract:
      "This research focuses on improving the fine-tuning process of self-supervised learning models for remote sensing, particularly the Cross-Scale Masked Auto-Encoder (MAE). We tackle the challenges of intricate, multi-source imagery and present advancements in adapting the Cross-Scale MAE for diverse remote sensing environments. Our contributions include methods for handling complex dataset dimensions and semantic diversity, demonstrating the model’s adaptability and expanding its application scope in remote sensing.",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&sortby=pubdate&authuser=3&citation_for_view=b___QQ8AAAAJ:2osOgNQ5qMEC",
  },
  {
    slug: "occasionally-secure-2024",
    title: "Ocassionally Secure: A Comparative Analysis of Code Generation Assistants",
    year: 2024,
    conference: "arXiv preprint",
    citations: 14,
    abstract:
      "We conduct a comparative analysis of four advanced LLMs (GPT-3.5, GPT-4, Bard, Gemini) across 9 tasks to assess code generation capabilities. We focus on identifying conditions under which LLMs can be effectively and safely deployed for code generation, with emphasis on security awareness via two distinct developer personas. We collected 61 code outputs and analyzed them across functionality, security, performance, complexity, and reliability.",
    fullAbstract:
      "$ $Large Language Models (LLMs) are being increasingly utilized in various applications, with code generations being a notable example. While previous research has shown that LLMs have the capability to generate both secure and insecure code, the literature does not take into account what factors help generate secure and effective code. Therefore in this paper we focus on identifying and understanding the conditions and contexts in which LLMs can be effectively and safely deployed in real-world scenarios to generate quality code. We conducted a comparative analysis of four advanced LLMs--GPT-3.5 and GPT-4 using ChatGPT and Bard and Gemini from Google--using 9 separate tasks to assess each model's code generation capabilities. We contextualized our study to represent the typical use cases of a real-life developer employing LLMs for everyday tasks as work. Additionally, we place an emphasis on security awareness which is represented through the use of two distinct versions of our developer persona. In total, we collected 61 code outputs and analyzed them across several aspects: functionality, security, performance, complexity, and reliability. These insights are crucial for understanding the models' capabilities and limitations, guiding future development and practical applications in the field of automated code generation.",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&sortby=pubdate&authuser=1&citation_for_view=b___QQ8AAAAJ:9yKSN-GCB0IC",
    arxiv: "https://arxiv.org/abs/2402.00689",
  },
  {
    slug: "cross-scale-mae-2023",
    title: "Cross-Scale MAE: A Tale of Multiscale Exploitation in Remote Sensing",
    year: 2023,
    conference: "NeurIPS 2023",
    citations: 54,
    abstract:
      "We present Cross-Scale MAE, a self-supervised model built on the Masked Auto-Encoder (MAE) framework for remote sensing image understanding. Cross-Scale MAE employs scale augmentation and enforces cross-scale consistency through both contrastive and generative losses to ensure consistent and meaningful representations for downstream tasks. Experimental evaluations demonstrate superior performance compared to standard MAE and other state-of-the-art remote sensing MAE methods.",
    fullAbstract:
      "Remote sensing images present unique challenges to image analysis due to the extensive geographic coverage, hardware limitations, and misaligned multi-scale images. This paper revisits the classical multi-scale representation learning problem but under the general framework of self-supervised learning for remote sensing image understanding. We present Cross-Scale MAE, a self-supervised model built upon the Masked Auto-Encoder (MAE). During pre-training, Cross-Scale MAE employs scale augmentation techniques and enforces cross-scale consistency constraints through both contrastive and generative losses to ensure consistent and meaningful representations well-suited for a wide range of downstream tasks. Further, our implementation leverages the xFormers library to accelerate network pre-training on a single GPU while maintaining the quality of learned representations. Experimental evaluations demonstrate that Cross-Scale MAE exhibits superior performance compared to standard MAE and other state-of-the-art remote sensing MAE methods.",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&sortby=pubdate&authuser=1&citation_for_view=b___QQ8AAAAJ:d1gkVwhDpl0C",
    code: "https://github.com/aicip/Cross-Scale-MAE",
    projectSlug: "cross-scale-mae",
  },
  {
    slug: "mcl-lc-aerial-segmentation-2023",
    title:
      "Semantic segmentation in aerial imagery using multi-level contrastive learning with local consistency",
    year: 2023,
    conference: "IEEE/WACV 2023",
    citations: 31,
    abstract:
      "We exploit self-supervised contrastive learning for semantic segmentation in aerial imagery. In addition to feature-level CL, we add another level of contrastive learning at the semantic level, taking advantage of segmentation output. We embed local mutual information in the semantic-level CL to enforce local consistency, enhancing representation power and generalization. The proposed multi-level contrastive learning with local consistency (mCL-LC) shows superior performance and better generalization, especially under domain shift.",
    fullAbstract:
      "Semantic segmentation in large-scale aerial images is an extremely challenging task. On one hand, the limited ground truth, as compared to the vast area the images cover, greatly hinders the development of supervised representation learning. On the other hand, the large footprint from remote sensing raises new challenges for semantic segmentation. In addition, the complex and ever changing image acquisition conditions further complicate the problem where domain shifting commonly occurs. In this paper, we exploit self-supervised contrastive learning (CL) methodologies for semantic segmentation in aerial imagery. In addition to performing CL at the feature level as most practices do, we add another level of contrastive learning, at the semantic level, taking advantage of the segmentation output from the downstream task. Further, we embed local mutual information in the semantic-level CL to enforce local consistency. This has largely enhanced the representation power at each pixel and improved the generalization capacity of the trained model. We refer to the proposed approach as multi-level contrastive learning with local consistency (mCL-LC). The experimental results on different benchmarks indicate that the proposed mCL-LC exhibits superior performance as compared to other state-of-the-art contrastive learning frameworks for the semantic segmentation task. mCL-LC also carries better generalization capacity especially when domain shifting exists.",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&sortby=pubdate&authuser=1&citation_for_view=b___QQ8AAAAJ:u-x6o8ySG0sC",
  },
  {
    slug: "hybrid-girvan-newman-2019",
    title: "A distributed hybrid community detection methodology for social networks",
    year: 2019,
    conference: "Algorithms (MDPI) 2019",
    citations: 3,
    abstract:
      "We combine network topology properties (loose similarity and local edge betweenness, an alternative to Girvan-Newman's edge betweenness) with intrinsic user content information to introduce a novel and highly distributed hybrid community detection methodology. The proposed approach is tested on real social graphs and compared to classic divisive community detection algorithms, proving exceptionally scalable, highly efficient, and accurate in revealing the subjacent network hierarchy.",
    fullAbstract:
      "Nowadays, the amount of digitally available information has tremendously grown, with real-world data graphs outreaching the millions or even billions of vertices. Hence, community detection, where groups of vertices are formed according to a well-defined similarity measure, has never been more essential affecting a vast range of scientific fields such as bio-informatics, sociology, discrete mathematics, nonlinear dynamics, digital marketing, and computer science. Even if an impressive amount of research has yet been published to tackle this NP-hard class problem, the existing methods and algorithms have virtually been proven inefficient and severely unscalable. In this regard, the purpose of this manuscript is to combine the network topology properties expressed by the loose similarity and the local edge betweenness, which is a currently proposed Girvan–Newman’s edge betweenness measure alternative, along with the intrinsic user content information, in order to introduce a novel and highly distributed hybrid community detection methodology. The proposed approach has been thoroughly tested on various real social graphs, roundly compared to other classic divisive community detection algorithms that serve as baselines and practically proven exceptionally scalable, highly efficient, and adequately accurate in terms of revealing the subjacent network hierarchy.",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b___QQ8AAAAJ&sortby=pubdate&authuser=1&citation_for_view=b___QQ8AAAAJ:u5HHmVD_uO8C",
  },
];

// Tier-1 venues get a special highlight
const TIER1_KEYWORDS = ["NeurIPS", "WACV", "ECCV", "CVPR", "ICCV", "ICML", "ICLR"];

export function isTier1(conference: string): boolean {
  return TIER1_KEYWORDS.some((kw) => conference.includes(kw));
}
