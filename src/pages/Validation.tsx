import React, { useState } from 'react';
import { Upload, CheckCircle, XCircle, AlertCircle, Users, MapPin, TrendingUp, Shield } from 'lucide-react';

const InfluencerValidationPipeline = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulated AI analysis function
  const runAnalysis = (influencerData) => {
    setIsAnalyzing(true);
    
    // Simulate API calls and AI processing
    setTimeout(() => {
      const mockResults = {
        influencerName: influencerData.name || 'Sample Influencer',
        platform: influencerData.platform || 'Instagram',
        totalFollowers: 45230,
        analyzedFollowers: 4523,
        authenticity: {
          realFollowers: 38450,
          fakeFollowers: 6780,
          realPercentage: 85,
          botScore: 15
        },
        locality: {
          targetRegion: 'Metro Detroit',
          localFollowers: 32584,
          localPercentage: 72,
          topCities: [
            { name: 'Detroit', count: 12450, percentage: 28 },
            { name: 'Canton', count: 8920, percentage: 20 },
            { name: 'Grosse Pointe', count: 5340, percentage: 12 },
            { name: 'Ann Arbor', count: 3874, percentage: 9 },
            { name: 'Other Metro Detroit', count: 2000, percentage: 4 }
          ]
        },
        engagement: {
          avgEngagementRate: 4.2,
          localEngagementRate: 5.8,
          commentQuality: 78,
          spamDetected: 12
        },
        verifiedLocalReachScore: 61.2,
        trustLevel: 'High',
        recommendations: [
          'Strong local presence in target market',
          'Authentic engagement patterns detected',
          'Minimal bot activity',
          'Recommended for local business partnerships'
        ],
        flags: [
          'Minor follower spike detected in March 2025',
          '15% followers outside target demographic'
        ]
      };
      
      setAnalysisData(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">AI Validation Pipeline</h2>
        <p className="text-lg opacity-90">
          Validate influencer authenticity and local reach with advanced AI analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500">
          <Users className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="font-semibold text-gray-700">Bot Detection</h3>
          <p className="text-sm text-gray-600 mt-2">AI-powered fake follower identification</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-500">
          <MapPin className="w-8 h-8 text-green-500 mb-2" />
          <h3 className="font-semibold text-gray-700">Regional Validation</h3>
          <p className="text-sm text-gray-600 mt-2">Verify local audience presence</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
          <TrendingUp className="w-8 h-8 text-purple-500 mb-2" />
          <h3 className="font-semibold text-gray-700">Engagement Analysis</h3>
          <p className="text-sm text-gray-600 mt-2">NLP-based comment quality scoring</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-orange-500">
          <Shield className="w-8 h-8 text-orange-500 mb-2" />
          <h3 className="font-semibold text-gray-700">Trust Scoring</h3>
          <p className="text-sm text-gray-600 mt-2">Comprehensive credibility metrics</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold mb-4">Pipeline Architecture</h3>
        <div className="space-y-3">
          {[
            { step: '1', title: 'Data Intake', desc: 'OAuth API access or scraping with consent' },
            { step: '2', title: 'Pre-Processing', desc: 'Anonymization, sampling, and cleaning' },
            { step: '3', title: 'Authenticity Checks', desc: 'Bot detection and engagement validation' },
            { step: '4', title: 'Regional Validation', desc: 'Location analysis and dialect detection' },
            { step: '5', title: 'Analytics Generation', desc: 'Dashboard and reporting' },
            { step: '6', title: 'Business Integration', desc: 'Trust badges and validation reports' }
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex items-start space-x-4 p-3 bg-gray-50 rounded">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {step}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{title}</h4>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AnalysisTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold mb-4">Run Analysis</h3>
        
        {!analysisData && !isAnalyzing && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Influencer Name
              </label>
              <input
                type="text"
                placeholder="Enter influencer name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="influencer-name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Instagram</option>
                <option>TikTok</option>
                <option>YouTube</option>
                <option>Lokal</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Region
              </label>
              <input
                type="text"
                placeholder="e.g., Metro Detroit, Canton MI"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="Metro Detroit"
              />
            </div>
            
            <button
              onClick={() => {
                const name = (document.getElementById('influencer-name') as HTMLInputElement)?.value || '';
                runAnalysis({ name });
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Start Validation</span>
            </button>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-gray-700">Analyzing Followers...</p>
            <p className="text-sm text-gray-600 mt-2">Running AI validation checks</p>
          </div>
        )}

        {analysisData && !isAnalyzing && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-bold text-gray-800">{analysisData.influencerName}</h4>
                <p className="text-gray-600">{analysisData.platform} • {analysisData.totalFollowers.toLocaleString()} followers</p>
              </div>
              <button
                onClick={() => setAnalysisData(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                New Analysis
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-800">Authenticity</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-900">{analysisData.authenticity.realPercentage}%</div>
                <p className="text-sm text-green-700 mt-1">Real followers</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">Local Reach</span>
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-900">{analysisData.locality.localPercentage}%</div>
                <p className="text-sm text-blue-700 mt-1">In target region</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-800">Trust Score</span>
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-900">{analysisData.verifiedLocalReachScore}</div>
                <p className="text-sm text-purple-700 mt-1">Verified Local Reach</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h5 className="font-semibold text-gray-800 mb-4">Top Cities</h5>
              <div className="space-y-3">
                {analysisData.locality.topCities.map((city, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{city.name}</span>
                      <span className="text-sm text-gray-600">{city.count.toLocaleString()} ({city.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${city.percentage * 3}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h5 className="font-semibold text-green-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Recommendations
                </h5>
                <ul className="space-y-1">
                  {analysisData.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-green-800">• {rec}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h5 className="font-semibold text-yellow-900 mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Flags
                </h5>
                <ul className="space-y-1">
                  {analysisData.flags.map((flag, idx) => (
                    <li key={idx} className="text-sm text-yellow-800">• {flag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const TechnicalTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold mb-4">Technical Implementation</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
              1. Data Intake Layer
            </h4>
            <div className="ml-4 space-y-2 text-sm text-gray-700">
              <p><strong>OAuth Integration:</strong> Instagram Graph API, TikTok Creator API, YouTube Data API</p>
              <p><strong>Data Points:</strong> Follower IDs, engagement metrics, post metadata, geo-tags</p>
              <p><strong>Rate Limiting:</strong> Implement exponential backoff and request queuing</p>
              <code className="block bg-gray-100 p-3 rounded mt-2 text-xs overflow-x-auto">
                {`# Python Example
from instagram_api import InstagramAPI
api = InstagramAPI(access_token=token)
followers = api.get_followers(user_id, fields=['id', 'username', 'profile_pic'])`}
              </code>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
              2. Bot Detection Model
            </h4>
            <div className="ml-4 space-y-2 text-sm text-gray-700">
              <p><strong>Algorithm:</strong> Random Forest Classifier trained on labeled bot/real accounts</p>
              <p><strong>Features:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Profile completeness (bio, photo, posts count)</li>
                <li>Follower/following ratio</li>
                <li>Account age and posting frequency</li>
                <li>Username patterns (random strings, numbers)</li>
                <li>Engagement velocity (likes/comments per hour)</li>
              </ul>
              <code className="block bg-gray-100 p-3 rounded mt-2 text-xs overflow-x-auto">
                {`# Scikit-learn Implementation
from sklearn.ensemble import RandomForestClassifier
features = ['profile_complete', 'follower_ratio', 'post_frequency', 'username_entropy']
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)
bot_probability = model.predict_proba(follower_features)`}
              </code>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
              3. NLP Engagement Analysis
            </h4>
            <div className="ml-4 space-y-2 text-sm text-gray-700">
              <p><strong>Model:</strong> BERT-based sentiment + spam classifier</p>
              <p><strong>Spam Detection:</strong> Identify repetitive, emoji-only, or generic comments</p>
              <p><strong>Quality Score:</strong> Contextual relevance to post content</p>
              <code className="block bg-gray-100 p-3 rounded mt-2 text-xs overflow-x-auto">
                {`# Transformers Implementation
from transformers import BertTokenizer, BertForSequenceClassification
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('spam-classifier')
inputs = tokenizer(comment_text, return_tensors='pt')
quality_score = model(**inputs).logits.softmax(dim=-1)`}
              </code>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <div className="w-2 h-2 bg-orange-600 rounded-full mr-2"></div>
              4. Geo-Location Validation
            </h4>
            <div className="ml-4 space-y-2 text-sm text-gray-700">
              <p><strong>Data Sources:</strong> Bio location, geo-tagged posts, hashtags, timezone</p>
              <p><strong>NLP Location Extraction:</strong> spaCy NER for city/state mentions</p>
              <p><strong>Scoring:</strong> Probabilistic matching to target region</p>
              <code className="block bg-gray-100 p-3 rounded mt-2 text-xs overflow-x-auto">
                {`# Location Extraction
import spacy
nlp = spacy.load('en_core_web_sm')
doc = nlp(bio_text)
locations = [ent.text for ent in doc.ents if ent.label_ == 'GPE']
region_match_score = calculate_geo_proximity(locations, target_region)`}
              </code>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
              5. Time Series Anomaly Detection
            </h4>
            <div className="ml-4 space-y-2 text-sm text-gray-700">
              <p><strong>Purpose:</strong> Detect bought followers (sudden spikes)</p>
              <p><strong>Algorithm:</strong> Isolation Forest or LSTM autoencoder</p>
              <code className="block bg-gray-100 p-3 rounded mt-2 text-xs overflow-x-auto">
                {`# Anomaly Detection
from sklearn.ensemble import IsolationForest
follower_growth = [daily_follower_counts]
clf = IsolationForest(contamination=0.1)
anomalies = clf.fit_predict(follower_growth.reshape(-1, 1))`}
              </code>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold mb-4">Architecture Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Backend</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Python/FastAPI for API endpoints</li>
              <li>• PostgreSQL for data storage</li>
              <li>• Redis for caching and rate limiting</li>
              <li>• Celery for async task processing</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">AI/ML</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• scikit-learn for bot detection</li>
              <li>• Transformers (BERT) for NLP</li>
              <li>• spaCy for entity extraction</li>
              <li>• TensorFlow for custom models</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Infrastructure</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• AWS/GCP for cloud hosting</li>
              <li>• Docker for containerization</li>
              <li>• Kubernetes for orchestration</li>
              <li>• Airflow for data pipelines</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Frontend</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• React for dashboard UI</li>
              <li>• Recharts for data visualization</li>
              <li>• TailwindCSS for styling</li>
              <li>• REST/GraphQL API integration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Lokal Influencer Validation</h1>
          <p className="text-gray-600">AI-powered authenticity and regional reach verification</p>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'analysis'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Run Analysis
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'technical'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Technical Details
            </button>
          </div>
        </div>

        <div>
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'analysis' && <AnalysisTab />}
          {activeTab === 'technical' && <TechnicalTab />}
        </div>
      </div>
    </div>
  );
};

export default InfluencerValidationPipeline;
