# Smart City Planning Visualization using Generative AI
## Comprehensive Implementation Plan

**Version:** 1.0  
**Date:** March 2026  
**Status:** Draft

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement & Goals](#2-problem-statement--goals)
3. [System Architecture Overview](#3-system-architecture-overview)
4. [Technology Stack](#4-technology-stack)
5. [Module Breakdown](#5-module-breakdown)
6. [AI/ML Pipeline Design](#6-aiml-pipeline-design)
7. [Data Strategy](#7-data-strategy)
8. [Sustainability Metrics Framework](#8-sustainability-metrics-framework)
9. [Visualization Design](#9-visualization-design)
10. [Scenario Simulation Engine](#10-scenario-simulation-engine)
11. [API Design](#11-api-design)
12. [Project Phases & Timeline](#12-project-phases--timeline)
13. [Team Structure & Responsibilities](#13-team-structure--responsibilities)
14. [Risk Assessment & Mitigation](#14-risk-assessment--mitigation)
15. [Evaluation Criteria Mapping](#15-evaluation-criteria-mapping)
16. [Future Roadmap](#16-future-roadmap)

---

## 1. Executive Summary

This plan outlines the design and development of a **Generative AI-powered Smart City Planning Visualization System** — an intelligent platform that enables urban planners, policymakers, and researchers to simulate, analyze, and visualize city layouts with a strong focus on sustainability, infrastructure efficiency, and real-world feasibility.

The system will accept real-world geospatial and demographic data as inputs, generate optimized city layout proposals using generative AI models, simulate multiple planning scenarios (what-if analysis), and render results as rich, interactive, and explainable visual dashboards.

### Key Differentiators
- Generative AI produces novel city layouts — not just rule-based suggestions
- Sustainability scoring integrated at every generation step
- Explainability layer to justify every AI decision
- Multi-scenario simulation for comparative urban planning
- Built on open, real-world datasets (OpenStreetMap, Census, Climate APIs)

---

## 2. Problem Statement & Goals

### Problem
Urban planners today rely on fragmented tools, siloed datasets, and manual analysis to make decisions that affect millions of lives. There is no unified AI-powered system that can:
- Generate feasible city layout alternatives
- Simulate infrastructure changes and their downstream effects
- Quantify sustainability trade-offs in real time
- Communicate complex planning outputs in an understandable visual format

### Goals

| # | Goal | Priority |
|---|------|----------|
| G1 | Generate city layouts considering traffic, population, energy, and green spaces | Critical |
| G2 | Enable scenario-based simulations (what-if analysis) | Critical |
| G3 | Integrate sustainability-focused metrics (carbon, walkability, energy usage) | Critical |
| G4 | Provide intuitive and explainable visual outputs | High |
| G5 | Support urban planning decision-making via comparison tools | High |
| G6 | Handle real-world data inputs (GIS, Census, OpenStreetMap) | High |

---

## 3. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE LAYER                         │
│   React + Mapbox GL / deck.gl Dashboard  │  Scenario Control Panel │
└────────────────────────────┬────────────────────────────────────────┘
                             │ REST / WebSocket
┌────────────────────────────▼────────────────────────────────────────┐
│                         API GATEWAY LAYER                           │
│              FastAPI Backend  │  Auth (JWT)  │  Rate Limiting       │
└──────┬──────────────┬────────────────┬───────────────┬──────────────┘
       │              │                │               │
┌──────▼──────┐ ┌─────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
│  Generative │ │  Scenario  │ │Sustainability│ │Explainability│
│  AI Engine  │ │ Simulation │ │   Scoring   │ │   Module    │
│  (LLM+GAN)  │ │   Engine   │ │   Engine    │ │  (SHAP/XAI) │
└──────┬──────┘ └─────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │              │                │               │
┌──────▼──────────────▼────────────────▼───────────────▼──────────────┐
│                        DATA LAYER                                    │
│  PostgreSQL + PostGIS  │  Redis Cache  │  Vector DB (Pinecone/Chroma)│
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
┌──────────────────────────────────▼──────────────────────────────────┐
│                     EXTERNAL DATA SOURCES                            │
│  OpenStreetMap │ Census API │ Climate APIs │ Energy Grid Data       │
└─────────────────────────────────────────────────────────────────────┘
```

### Architecture Principles
- **Microservices-ready**: Each engine (AI, Simulation, Scoring) is independently deployable
- **Event-driven**: Scenario runs publish results asynchronously via WebSocket
- **Geo-native**: PostGIS for all spatial operations
- **AI-first**: Every layout decision runs through an AI model, not static rules

---

## 4. Technology Stack

### 4.1 Frontend
| Component | Technology | Justification |
|-----------|-----------|---------------|
| Framework | React 18 + TypeScript | Component-driven, type-safe UI |
| Map Rendering | Mapbox GL JS + deck.gl | High-performance geospatial visualization |
| Charts & Metrics | Recharts + D3.js | Flexible sustainability dashboards |
| State Management | Zustand | Lightweight, async-friendly |
| UI Components | Tailwind CSS + shadcn/ui | Rapid professional UI development |
| Real-time Updates | Socket.IO Client | Live simulation feedback |

### 4.2 Backend
| Component | Technology | Justification |
|-----------|-----------|---------------|
| API Framework | FastAPI (Python) | High-performance async, auto-docs |
| Task Queue | Celery + Redis | Async AI generation jobs |
| Database | PostgreSQL + PostGIS | Spatial data + standard relational |
| Cache | Redis | Fast scenario result caching |
| Auth | JWT + OAuth2 | Secure, stateless authentication |
| File Storage | AWS S3 / MinIO | Generated layout assets |

### 4.3 AI/ML
| Component | Technology | Justification |
|-----------|-----------|---------------|
| LLM (Layout Logic) | OpenAI GPT-4o / LLaMA 3 | Natural language planning rules |
| Generative Model | Conditional GAN / Diffusion Model | Novel city layout generation |
| Spatial ML | Graph Neural Networks (PyG) | Infrastructure connectivity modeling |
| Optimization | NSGA-II (Multi-objective EA) | Pareto-optimal sustainability trade-offs |
| Explainability | SHAP + LIME | AI decision transparency |
| Embeddings | Sentence Transformers | Semantic planning query matching |

### 4.4 Data & Infrastructure
| Component | Technology |
|-----------|-----------|
| Geospatial Processing | GeoPandas, Shapely, Fiona |
| Data Pipelines | Apache Airflow |
| Containerization | Docker + Docker Compose |
| Orchestration | Kubernetes (production) |
| CI/CD | GitHub Actions |
| Monitoring | Prometheus + Grafana |

---

## 5. Module Breakdown

### Module 1 — Data Ingestion & Preprocessing
**Purpose:** Collect, clean, and normalize real-world city data  
**Inputs:** OpenStreetMap exports, Census CSV, Climate JSON, Energy datasets  
**Outputs:** Normalized GeoJSON features stored in PostGIS  

**Sub-components:**
- `OSMParser` — Parses OpenStreetMap PBF/XML files into road networks, land use polygons
- `CensusNormalizer` — Maps census block data to spatial grid cells
- `ClimateDataAdapter` — Fetches and normalizes weather/climate data per region
- `EnergyGridMapper` — Associates energy consumption zones with geographic boundaries
- `DataQualityValidator` — Flags missing, inconsistent, or outlier data points

---

### Module 2 — Generative AI Engine
**Purpose:** Core AI model that generates candidate city layouts  

**Sub-components:**

#### 2a. LLM-based Planning Reasoner
- Takes textual planning goals + constraints as prompt
- Returns structured JSON with zone distribution rules, density parameters, priority constraints
- Model: GPT-4o via API or locally fine-tuned LLaMA 3 on urban planning datasets
- Example input: *"Design a low-carbon, high-density mixed-use zone for 500,000 residents near a coastal area"*

#### 2b. Spatial Layout Generator (Conditional GAN / Diffusion)
- Conditioned on: region shape, population density, existing infrastructure
- Outputs: 2D raster layout with zone labels (residential, commercial, industrial, green, transport)
- Training data: Procedurally generated + real city layout pairs
- Architecture: Pix2Pix or Stable Diffusion fine-tuned on urban layout images

#### 2c. Graph Neural Network for Infrastructure
- Models city as a graph (nodes = zones, edges = roads/utilities)
- Predicts optimal road networks, utility line placement, public transport routes
- Framework: PyTorch Geometric

#### 2d. Multi-Objective Optimizer
- Uses NSGA-II evolutionary algorithm
- Optimizes simultaneously for: carbon footprint, walkability, cost, green space ratio
- Produces Pareto front of non-dominated solutions for planner review

---

### Module 3 — Scenario Simulation Engine
**Purpose:** Run what-if analyses on generated or existing city layouts  

**Scenarios Supported:**

| Scenario Type | Description | Model Used |
|---------------|-------------|------------|
| Population Growth | +20% / +50% population over 10 years | Agent-based model |
| Climate Event | Flood, heatwave, extreme drought impact | Physics simulation |
| Transport Shift | Replace 50% private vehicles with EVs/transit | Traffic flow model |
| Energy Transition | Solar/wind replacing fossil fuel grid | Energy network model |
| Green Space Expansion | Add parks/urban forests by X% area | Vegetation + cooling model |
| Industrial Rezoning | Convert industrial zones to residential | Land use change model |

**Simulation Stack:**
- **SUMO (Simulation of Urban MObility)** for traffic simulation
- **Mesa** Python framework for Agent-Based Modelling (ABM)
- **PyPSA** for energy network simulation
- **Custom diffusion model** for heat island/climate effects

**Output:** Time-series metrics per scenario + visual heatmaps of change

---

### Module 4 — Sustainability Scoring Engine
**Purpose:** Quantify and score each generated layout against sustainability benchmarks  

**Metrics Computed:**

```
Sustainability Score (0-100) = Weighted Average of:
  ├── Carbon Footprint Index       (weight: 25%)
  ├── Walkability Score            (weight: 20%)
  ├── Green Space Coverage         (weight: 15%)
  ├── Energy Efficiency Rating     (weight: 15%)
  ├── Public Transit Accessibility (weight: 10%)
  ├── Air Quality Projection       (weight: 10%)
  └── Social Equity Index          (weight: 5%)
```

**Benchmark Standards Integrated:**
- UN Sustainable Development Goals (SDG 11 — Sustainable Cities)
- LEED Neighborhood Development criteria
- WHO Air Quality Guidelines
- WRI City Index

---

### Module 5 — Explainability Module
**Purpose:** Make AI decisions transparent and understandable to non-technical planners  

**Techniques:**
- **SHAP Values** — Show which input features most influenced layout decisions
- **Attention Maps** — Highlight which city regions the diffusion model focused on
- **Natural Language Explanations** — LLM generates plain-English justifications for each layout choice
- **Counterfactual Analysis** — "If we had increased green space by 10%, the score would improve by X"

**Output Format:** Each layout card shows:
1. Top 3 reasons this layout was generated
2. Feature importance bar chart
3. "What would change if..." interactive sliders

---

### Module 6 — Visualization & Dashboard
**Purpose:** Render all outputs in an intuitive, interactive format  

**Dashboard Panels:**

| Panel | Content |
|-------|---------|
| City Map View | Interactive 3D map with generated layout layers |
| Scenario Comparison | Side-by-side layout comparisons with diff highlighting |
| Sustainability Scorecard | Radar chart + KPI cards per layout |
| Simulation Timeline | Animated time-series of scenario effects |
| AI Explanation Panel | SHAP charts + natural language rationale |
| Layer Controls | Toggle traffic, energy, population, green space overlays |
| Export Panel | Download layouts as GeoJSON, PDF report, or PNG |

---

## 6. AI/ML Pipeline Design

```
INPUT DATA
    │
    ▼
┌─────────────────────────────────┐
│   Feature Engineering Pipeline  │
│  - Spatial grid encoding        │
│  - Population density maps      │
│  - Infrastructure graphs        │
│  - Climate embeddings           │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   LLM Planning Reasoner         │
│  - Parse planning goals         │
│  - Generate constraint JSON     │
│  - Output: zone parameters      │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Conditional Layout Generator   │
│  (GAN / Diffusion Model)        │
│  - Input: constraints + region  │
│  - Output: N candidate layouts  │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  GNN Infrastructure Optimizer   │
│  - Road network generation      │
│  - Utility grid placement       │
│  - Transit route optimization   │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Multi-Objective Optimizer      │
│  (NSGA-II)                      │
│  - Pareto front generation      │
│  - Trade-off scoring            │
│  - Output: Top K layouts        │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Sustainability Scoring Engine  │
│  - Carbon, walkability, energy  │
│  - SDG benchmark alignment      │
│  - Output: Score per layout     │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Explainability Layer           │
│  - SHAP feature importance      │
│  - LLM-generated rationale      │
│  - Counterfactual suggestions   │
└──────────────┬──────────────────┘
               │
               ▼
         VISUALIZATION
         DASHBOARD OUTPUT
```

---

## 7. Data Strategy

### 7.1 Data Sources

| Dataset | Source | Format | Usage |
|---------|---------|--------|-------|
| Street Networks & Land Use | OpenStreetMap (Overpass API) | GeoJSON / PBF | Base city graph |
| Population & Demographics | US Census / WorldPop | CSV + Raster | Density modeling |
| Climate & Weather | OpenWeatherMap / ERA5 (Copernicus) | JSON / NetCDF | Climate scenarios |
| Energy Consumption | EIA / OpenEnergy | CSV | Energy scoring |
| Air Quality | OpenAQ / EPA AQI | JSON | Air quality metrics |
| Satellite Imagery | Sentinel-2 (ESA) | GeoTIFF | Visual training data |
| Urban Green Space | Global Urban Tree Coverage | Shapefile | Green space scoring |
| Public Transport | GTFS Feeds (TransitLand) | GTFS ZIP | Transit accessibility |

### 7.2 Data Pipeline Architecture

```
Raw Sources → Airflow DAG → ETL Processors → PostGIS DB → Feature Store → AI Models
```

**ETL Steps:**
1. **Extract** — API calls, file downloads, web scraping with rate limiting
2. **Transform** — Coordinate system normalization (all to EPSG:4326), deduplication, grid snapping
3. **Load** — Upsert into PostGIS with spatial indexing (GIST index)
4. **Validate** — Schema checks, coverage completeness score, outlier flagging

### 7.3 Data Privacy & Compliance
- No personally identifiable information (PII) stored
- Census data used only at block/tract level aggregation
- All data sources are open-licensed (ODbL, CC-BY, Public Domain)

---

## 8. Sustainability Metrics Framework

### 8.1 Carbon Footprint Index
- **Formula:** `CFI = (Transport_Emissions + Building_Emissions + Energy_Emissions) / Population`
- **Data:** Traffic simulation output + building type density + energy grid mix
- **Benchmark:** Paris Agreement target of net-zero by 2050 trajectory

### 8.2 Walkability Score
- **Method:** Walk Score algorithm adapted to generated layout
- **Factors:** Distance to amenities, sidewalk coverage, road crossing safety, elevation
- **Scale:** 0–100 (>70 = Very Walkable)

### 8.3 Green Space Coverage
- **Formula:** `GSC = Green_Space_Area / Total_Urban_Area × 100`
- **Benchmark:** WHO recommends ≥9 m² green space per capita
- **Types counted:** Parks, urban forests, green roofs, community gardens

### 8.4 Energy Efficiency Rating
- **Metric:** kWh per capita per day
- **Factors:** Building insulation scores, renewable energy penetration, smart grid adoption
- **Rating Scale:** A++ to F (aligned with EU Energy Performance of Buildings Directive)

### 8.5 Social Equity Index
- **Measures:** Distribution of green space, transit access, and healthcare proximity across income zones
- **Method:** Gini coefficient applied to spatial access distributions
- **Goal:** Score > 0.7 (equitable distribution)

---

## 9. Visualization Design

### 9.1 Map Layers Architecture

```
Layer Stack (bottom → top):
  [1] Satellite/OSM Base Map
  [2] Land Use Zone Fill (semi-transparent polygons)
  [3] Road Network Lines (weighted by traffic volume)
  [4] Population Heatmap (kernel density)
  [5] Energy Grid Overlay (transmission lines + nodes)
  [6] Green Space Polygons
  [7] Sustainability Score Choropleth
  [8] Simulation Change Diff Layer (animated)
  [9] AI Explanation Highlights (attention regions)
  [10] UI Controls & Labels
```

### 9.2 Dashboard Wireframe

```
┌────────────────────────────────────────────────────────────┐
│  HEADER: Smart City AI Planner    [New Scenario] [Export]  │
├──────────────────────────┬─────────────────────────────────┤
│                          │  SUSTAINABILITY SCORECARD        │
│                          │  ┌───────────────────────────┐  │
│   INTERACTIVE MAP        │  │  Overall Score: 78/100    │  │
│   (Mapbox + deck.gl)     │  │  ████████░░ Carbon: 82    │  │
│                          │  │  ███████░░░ Walk:  71     │  │
│   [Layer Toggles]        │  │  █████████░ Green: 88     │  │
│   ☑ Traffic  ☑ Energy    │  │  ████████░░ Energy: 79    │  │
│   ☑ Green    ☑ Population│  └───────────────────────────┘  │
│                          │  AI EXPLANATION                  │
├──────────────────────────┤  "This layout prioritizes..."   │
│  SCENARIO COMPARISON     ├─────────────────────────────────┤
│  [Layout A] vs [Layout B]│  SIMULATION TIMELINE            │
│  [Diff View]             │  [Play] ──────────── 2025-2040  │
└──────────────────────────┴─────────────────────────────────┘
```

### 9.3 3D City View
- Buildings rendered in 3D using deck.gl `BuildingsLayer`
- Height proportional to density/floor count
- Color-coded by zone type
- Shadow simulation for solar access analysis

### 9.4 Accessibility Requirements
- WCAG 2.1 AA compliant color palettes
- Screen reader compatible metric summaries
- Keyboard-navigable controls
- Color-blind safe map themes (deuteranopia/protanopia safe)

---

## 10. Scenario Simulation Engine

### 10.1 What-If Scenario Configuration

Each scenario is defined as a JSON config:

```
{
  "scenario_id": "pop_growth_2035",
  "base_layout": "layout_uuid_xyz",
  "modifications": [
    { "type": "population_change", "delta_percent": 30, "years": 10 },
    { "type": "transport_modal_shift", "ev_adoption_percent": 60 },
    { "type": "green_space_add", "area_sqkm": 5.2, "zone": "north_district" }
  ],
  "output_metrics": ["carbon", "walkability", "energy", "traffic_congestion"],
  "time_steps": 12
}
```

### 10.2 Simulation Execution Flow

```
Scenario Config
    │
    ▼
Parameter Validator → Celery Task Queue
    │
    ▼
SUMO Traffic Simulation (parallel)
    │
    ▼
ABM Population Model (Mesa)
    │
    ▼
Energy Network Model (PyPSA)
    │
    ▼
Results Aggregator → Time-series DB (TimescaleDB)
    │
    ▼
Sustainability Re-scorer
    │
    ▼
WebSocket Push to Frontend → Animated Map Update
```

### 10.3 Comparative Analysis
- **Side-by-side view**: Two scenarios rendered simultaneously with synchronized zoom/pan
- **Diff highlighting**: Changed zones highlighted with color-coded change magnitude
- **Delta scorecard**: Shows improvement/degradation per sustainability metric
- **Recommendation engine**: LLM summarizes "Scenario B is better because..."

---

## 11. API Design

### 11.1 Core Endpoints

```
POST   /api/v1/layouts/generate          → Generate new city layout
GET    /api/v1/layouts/{layout_id}       → Retrieve layout details
GET    /api/v1/layouts/{layout_id}/score → Get sustainability scores
GET    /api/v1/layouts/{layout_id}/explain → Get AI explanations

POST   /api/v1/scenarios/create          → Create what-if scenario
POST   /api/v1/scenarios/{id}/run        → Execute simulation (async)
GET    /api/v1/scenarios/{id}/status     → Check simulation progress
GET    /api/v1/scenarios/{id}/results    → Fetch simulation results

GET    /api/v1/data/regions              → List available data regions
POST   /api/v1/data/upload               → Upload custom GeoJSON data
GET    /api/v1/data/layers/{region_id}   → Fetch data layers for region

GET    /api/v1/compare/{layout_a}/{layout_b} → Compare two layouts
GET    /api/v1/export/{layout_id}?format=pdf → Export report

WS     /ws/simulation/{scenario_id}      → Real-time simulation updates
```

### 11.2 Sample Generate Request/Response

**Request:**
```
POST /api/v1/layouts/generate
{
  "region_id": "mumbai_central",
  "population_target": 500000,
  "planning_goals": [
    "minimize_carbon_emissions",
    "maximize_walkability",
    "ensure_equitable_green_space"
  ],
  "constraints": {
    "coastal_buffer_km": 0.5,
    "max_building_height_m": 120,
    "min_green_space_percent": 20
  },
  "num_variants": 3
}
```

**Response:**
```
{
  "job_id": "gen_abc123",
  "status": "processing",
  "estimated_seconds": 45,
  "websocket_url": "/ws/generation/gen_abc123"
}
```

---

## 12. Project Phases & Timeline

### Phase 1 — Foundation (Weeks 1–3)
**Goal:** Core infrastructure, data pipelines, and basic layout generation

| Task | Owner | Duration |
|------|-------|----------|
| Project setup, repo structure, Docker configs | Backend | 3 days |
| PostGIS database schema design | Backend | 2 days |
| OSM + Census data ingestion pipeline | Data | 5 days |
| Basic FastAPI skeleton with auth | Backend | 3 days |
| React app scaffolding + Mapbox integration | Frontend | 4 days |
| LLM planning reasoner (GPT-4o integration) | AI | 5 days |

**Milestone:** Data loads successfully, map renders OSM data, LLM returns planning JSON

---

### Phase 2 — AI Engine Core (Weeks 4–7)
**Goal:** Working generative layout model and infrastructure optimizer

| Task | Owner | Duration |
|------|-------|----------|
| Conditional GAN/Diffusion model training | AI | 10 days |
| GNN infrastructure optimizer | AI | 7 days |
| NSGA-II multi-objective optimizer | AI | 5 days |
| Sustainability scoring engine | AI + Backend | 4 days |
| Layout storage & retrieval API | Backend | 3 days |
| Basic map visualization of generated layouts | Frontend | 5 days |

**Milestone:** System generates 3 candidate layouts for a test region with sustainability scores

---

### Phase 3 — Simulation Engine (Weeks 8–10)
**Goal:** Functional what-if scenario simulation

| Task | Owner | Duration |
|------|-------|----------|
| SUMO traffic simulation integration | AI | 6 days |
| Mesa ABM population model | AI | 5 days |
| PyPSA energy simulation | AI | 4 days |
| Celery async task queue setup | Backend | 3 days |
| WebSocket real-time updates | Backend + Frontend | 4 days |
| Scenario configuration UI | Frontend | 4 days |

**Milestone:** Run a population growth scenario, results stream to map in real-time

---

### Phase 4 — Explainability & Polish (Weeks 11–12)
**Goal:** XAI layer, full dashboard, comparison tools

| Task | Owner | Duration |
|------|-------|----------|
| SHAP integration for layout decisions | AI | 4 days |
| LLM natural language explanation generator | AI | 3 days |
| Sustainability scorecard dashboard panel | Frontend | 4 days |
| Side-by-side scenario comparison view | Frontend | 3 days |
| PDF/GeoJSON export functionality | Backend + Frontend | 3 days |
| Performance optimization & caching | Backend | 3 days |

**Milestone:** Complete end-to-end demo with explainable, comparable scenarios

---

### Phase 5 — Testing & Presentation (Weeks 13–14)
**Goal:** Quality assurance, demo preparation, documentation

| Task | Owner | Duration |
|------|-------|----------|
| Unit & integration test suite | All | 4 days |
| Load testing (scenario simulation under load) | Backend | 2 days |
| Accessibility audit | Frontend | 2 days |
| Demo city dataset preparation (3 cities) | Data | 3 days |
| Documentation (README, API docs, user guide) | All | 3 days |
| Demo rehearsal & presentation prep | All | 2 days |

**Milestone:** Final working demo, documented, tested, and presentation-ready

---

## 13. Team Structure & Responsibilities

| Role | Count | Key Responsibilities |
|------|-------|---------------------|
| AI/ML Engineer | 2 | GAN/Diffusion model, GNN, NSGA-II, SHAP |
| Backend Engineer | 2 | FastAPI, PostGIS, Celery, data pipelines |
| Frontend Engineer | 2 | React, Mapbox, dashboard, UX design |
| Data Engineer | 1 | OSM/Census ETL, Airflow DAGs, data quality |
| DevOps Engineer | 1 | Docker, CI/CD, Kubernetes, monitoring |
| Project Lead | 1 | Architecture decisions, coordination, demos |

---

## 14. Risk Assessment & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| GAN training instability / mode collapse | High | High | Use Diffusion models as fallback; start with Pix2Pix |
| Real-world data gaps for target city | Medium | High | Procedurally generate synthetic training data; use OpenStreetMap globally |
| LLM API rate limits / costs | Medium | Medium | Cache LLM responses; set up local LLaMA 3 fallback |
| Simulation run times too slow for demo | High | High | Pre-run and cache popular scenarios; limit to 5-minute simulations |
| Mapbox render performance on large datasets | Medium | Medium | Use tile server + data decimation for large layouts |
| Overfitting on limited city training data | Medium | Medium | Data augmentation + transfer learning from larger urban datasets |
| Scope creep across 14 weeks | High | High | Strict phase gates; MVP first, enhancements after Phase 3 |

---

## 15. Evaluation Criteria Mapping

| Evaluation Criterion | How We Address It | Modules Involved |
|---------------------|-------------------|-----------------|
| **Realism** | Real OSM, Census, Climate data; SUMO physics-based traffic | Data Ingestion, Simulation Engine |
| **AI Usage** | LLM + GAN + GNN + NSGA-II all contribute to generation | AI Engine, Explainability |
| **Sustainability Focus** | 7-dimension sustainability score; SDG/WHO benchmarks | Sustainability Scoring, Metrics Framework |
| **Visualization Quality** | 3D interactive map, animated simulations, explanation panels | Visualization Dashboard |
| **Practical Relevance** | Real city data input, planner-friendly UI, export to GeoJSON/PDF | All modules |
| **Explainability** | SHAP values, attention maps, LLM-written rationale | Explainability Module |

---

## 16. Future Roadmap

### v2.0 — Advanced Capabilities
- **Digital Twin Integration**: Connect to live IoT sensor feeds for real-time city state
- **AR/VR Export**: Export layouts to Unity/Unreal for immersive city walkthroughs
- **Collaborative Planning**: Multi-user workspace for planner teams with version history
- **Policy Simulation**: Model effects of zoning law changes on layout scores
- **Historical Validation**: Backtest AI predictions against actual city development data

### v3.0 — Platform Expansion
- **Multi-city comparison**: Benchmark one city's sustainability against global peer cities
- **Citizen Engagement Portal**: Public-facing version for community feedback on layouts
- **Regulatory Compliance Check**: Automatic flag of layouts violating local building codes
- **Carbon Credit Estimation**: Quantify carbon credits earned from sustainable layout choices

---

## Appendix A — Folder Structure

```
smart-city-ai-planner/
├── backend/
│   ├── app/
│   │   ├── api/            # FastAPI route handlers
│   │   ├── models/         # SQLAlchemy ORM models
│   │   ├── services/       # Business logic services
│   │   ├── tasks/          # Celery async tasks
│   │   └── schemas/        # Pydantic request/response schemas
│   ├── tests/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page-level components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # Zustand state stores
│   │   └── utils/          # Map utilities, formatters
│   └── package.json
├── ai_engine/
│   ├── models/
│   │   ├── layout_gan/     # GAN/Diffusion model
│   │   ├── gnn/            # Graph Neural Network
│   │   ├── optimizer/      # NSGA-II optimizer
│   │   └── llm/            # LLM planning reasoner
│   ├── training/           # Training scripts + configs
│   └── inference/          # Inference pipeline
├── data/
│   ├── pipelines/          # Airflow DAGs
│   ├── processors/         # ETL processors
│   └── schemas/            # Data schemas
├── infrastructure/
│   ├── docker/             # Dockerfiles
│   ├── k8s/                # Kubernetes manifests
│   └── terraform/          # Cloud infrastructure as code
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── api/                # OpenAPI spec
│   ├── architecture/       # Architecture diagrams
│   └── user_guide/         # End-user documentation
└── README.md
```

---

## Appendix B — Key Performance Indicators

| KPI | Target |
|-----|--------|
| Layout generation time | < 60 seconds per variant |
| Scenario simulation time | < 5 minutes per scenario |
| Sustainability score accuracy (vs. manual) | > 85% correlation |
| Map rendering FPS | > 30 FPS on mid-range hardware |
| API response time (non-AI endpoints) | < 200ms P95 |
| System uptime | > 99.5% during demo period |
| Concurrent simulation jobs supported | ≥ 10 parallel |

---

*This plan is a living document — update as implementation learnings emerge.*  
*Last updated: March 2026*
```

Here's a summary of what the `plan.md` covers:

---

## What's Inside the Plan

The document is structured into **16 major sections** plus appendices:

### 🏗️ Architecture & Design
- Full **layered system architecture** diagram (UI → API → AI Engines → Data)
- **Microservices-ready** design where each engine (AI, Simulation, Scoring) is independently deployable
- Detailed **folder structure** for the entire codebase

### 🤖 AI/ML Strategy (The Core)
- **4 AI models working together**: LLM (planning reasoning) + Conditional GAN/Diffusion (layout generation) + Graph Neural Network (infrastructure) + NSGA-II (multi-objective optimization)
- Full **AI pipeline diagram** from raw data → Pareto-optimal layouts
- SHAP + LIME for **explainability** — every AI decision is justified

### 📊 Sustainability Framework
- **7-dimension scoring system** covering Carbon, Walkability, Green Space, Energy, Transit, Air Quality, and Social Equity
- Benchmarked against **WHO, UN SDGs, LEED, and Paris Agreement** standards

### 🎮 Simulation Engine
- **6 what-if scenario types** (population growth, climate events, EV transition, etc.)
- Uses **SUMO, Mesa ABM, and PyPSA** for physics-based simulations
- Real-time WebSocket streaming of simulation progress to the map

### 🗓️ Execution Plan
- **14-week phased timeline** with clear milestones per phase
- Risk register with mitigation strategies
- Direct mapping of every evaluation criterion to specific modules